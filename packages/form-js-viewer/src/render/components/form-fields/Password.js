import { isArray, isObject } from 'min-dash';
import { useContext } from 'preact/hooks';

import { FormContext } from '../../context';

import Description from '../Description';
import Errors from '../Errors';
import Label from '../Label';
import InputAdorner from './parts/TemplatedInputAdorner';

import {
  formFieldClasses,
  prefixId
} from '../Util';

const type = 'passwordfield';


export default function Passwordfield(props) {
  const {
    disabled,
    errors = [],
    onBlur,
    field,
    readonly,
    value = ''
  } = props;

  const {
    description,
    id,
    label,
    appearance = {},
    validate = {}
  } = field;

  const {
    prefixAdorner,
    suffixAdorner
  } = appearance;

  const { required } = validate;

  const onChange = ({ target }) => {
    props.onChange({
      field,
      value: target.value
    });
  };

  const { formId } = useContext(FormContext);
  const errorMessageId = errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  return <div class={ formFieldClasses(type, { errors, disabled, readonly }) }>
    <Label
      id={ prefixId(id, formId) }
      label={ label }
      required={ required } />
    <InputAdorner disabled={ disabled } readonly={ readonly } pre={ prefixAdorner } post={ suffixAdorner }>
      <input
        class="fjs-input"
        disabled={ disabled }
        readOnly={ readonly }
        id={ prefixId(id, formId) }
        onInput={ onChange }
        onBlur={ onBlur }
        type="password"
        value={ value }
        aria-describedby={ errorMessageId } />
    </InputAdorner>
    <Description description={ description } />
    <Errors errors={ errors } id={ errorMessageId } />
  </div>;
}

Passwordfield.config = {
  type,
  keyed: true,
  label: 'Password field',
  group: 'basic-input',
  emptyValue: '',
  sanitizeValue: ({ value }) => {
    if (isArray(value) || isObject(value)) {
      return '';
    }

    // sanitize newlines to spaces
    if (typeof value === 'string') {
      return value.replace(/[\r\n\t]/g, ' ');
    }

    return String(value);
  },
  create: (options = {}) => ({ ...options })
};
