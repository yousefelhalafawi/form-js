import { useContext } from "preact/hooks";

import { FormContext } from "../../context";

import Description from "../Description";
import Errors from "../Errors";
import Label from "../Label";
import InputAdorner from "./parts/TemplatedInputAdorner";

import { formFieldClasses, prefixId } from "../Util";

const type = "imagefield";

export default function ImageField(props) {
  const { disabled, errors = [], onBlur, field, readonly, value = "" } = props;

  const { description, id, label, appearance = {}, validate = {} } = field;

  const { prefixAdorner, suffixAdorner } = appearance;

  const { required } = validate;

  const onChange = (event) => {
    const imageURL = URL.createObjectURL(event.target.files[0]);
    props.onChange({
      field,
      value: imageURL,
    });
  };

  const { formId } = useContext(FormContext);
  const errorMessageId =
    errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  return (
    <div class={formFieldClasses(type, { errors, disabled, readonly })}>
      <Label id={prefixId(id, formId)} label={label} required={required} />
      <InputAdorner
        disabled={disabled}
        readonly={readonly}
        pre={prefixAdorner}
        post={suffixAdorner}
      >
        <input
          class="fjs-input"
          disabled={disabled}
          readOnly={readonly}
          id={prefixId(id, formId)}
          onChange={onChange}
          type="file"
          accept="image/*"
          aria-describedby={errorMessageId}
        />
      </InputAdorner>
      <Description description={description} />
      <Errors errors={errors} id={errorMessageId} />
      {value && (
        <img
          src={value}
          alt={label}
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
      )}
    </div>
  );
}

ImageField.config = {
  type,
  keyed: true,
  label: "Image field",
  group: "basic-input",
  emptyValue: "",
  // No need to sanitize images; we assume the URL is valid
  create: (options = {}) => ({ ...options }),
};
