hassdb
===

hassdb is a simple and minimal approach to persistent storage in Home Assistant.

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contribution Guidelines](#contribution-guidelines)

<!-- tocstop -->

## Installation

To install hassdb, simply run:
```
npm install -g hassdb
```

## Usage

To store a value:
```
hassdb 'key' 'value'
```

To read a value:
```
hassdb 'key'
```

## Examples

### Store with Home Assistant

Add this to your Home Assistant `configuration.yaml`:
```yaml
shell_command:
  hassdb_set: 'hassdb "{{ key }}" "{{ value }}"'

automation:
  trigger:
    ...
  action:
    - service: shell_command.hassdb_set
      data_template:
        key: light.living_room.state
        value: "{{ states.light.living_room.state }}"
    - service: shell_command.hassdb_set
      data_template:
        key: light.living_room.attributes
        value: "{{ states.light.living_room.attributes }}"
```

## Contribution Guidelines

Feel free to put up a pull request to fix a bug or maybe add a feature. I will
give it a code review and make sure that it does not break backwards
compatibility. If I or any other collaborators agree that it is in line with
the vision of the project, we will work with you to get the code into
a mergeable state and merge it into the master branch.
