import { isUndefined } from 'min-dash';

import { get } from 'min-dash';

import { INPUTS } from '../Util';

import { useService } from '../hooks';

import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';


export default function KeyEntry(props) {
  const {
    editField,
    field
  } = props;

  const {
    type
  } = field;

  const entries = [];

  if (INPUTS.includes(type)) {
    entries.push({
      id: 'key',
      component: Key,
      editField: editField,
      field: field,
      isEdited: isTextFieldEntryEdited
    });
  }

  return entries;
}

function Key(props) {
  const {
    editField,
    field,
    id
  } = props;

  const formFieldRegistry = useService('formFieldRegistry');

  const debounce = useService('debounce');

  const path = [ 'key' ];

  const getValue = () => {
    return get(field, path, '');
  };

  const setValue = (value, error) => {
    if (error) {
      return;
    }

    return editField(field, path, value);
  };

  const validate = (value) => {
    if (isUndefined(value) || !value.length) {
      return 'Must not be empty.';
    }

    if (/\s/.test(value)) {
      return 'Must not contain spaces.';
    }

    const assigned = formFieldRegistry._keys.assigned(value);

    if (assigned && assigned !== field) {
      return 'Must be unique.';
    }

    return null;
  };

  return TextFieldEntry({
    debounce,
    description: 'Binds to a form variable',
    element: field,
    getValue,
    id,
    label: 'Key',
    tooltip: 'Use a unique "key" to link the form element and the related input/output data. When dealing with nested data, break it down in the user task\'s input mapping before using it.',
    setValue,
    validate
  });
}