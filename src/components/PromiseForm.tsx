import { FormEvent } from "react";

export function submitEvent(e: FormEvent<HTMLFormElement>) {
  const body = new FormData();

  Array.from(
    e.currentTarget.elements
  ).forEach((el: any) => {
    if (el.name
      && !el.disabled
      && !['button', 'reset', 'submit'].includes(el.type)
    ) {
      if (el.type === 'select-multiple') {
        for (let n = 0; n < el.options.length; n += 1) {
          if (el.options[n].selected) {
            body.append(el.name, el.options[n].value);
          }
        }
      } else if (el.type === 'file') {
        body.append(el.name, el.files[0]);
      } else if (el.type === 'checkbox' && el.checked) {
        body.append(el.name, el.value);
      } else if (el.type === 'radio' && el.checked) {
        body.append(el.name, el.value);
      } else if (['text', 'number', 'select-one', 'textarea', 'password', 'email', 'hidden'].includes(el.type)) {
        body.append(el.name, el.value);
      }
    }
  });

  return body;
}

export type onSubmitParams = Parameters<(e: FormEvent<HTMLFormElement>, data: FormData) => void | Promise<void>>;

export type PromiseFormProps = Omit<React.ComponentProps<'form'>, 'onSubmit'> & {
  onSubmit: (...args: onSubmitParams) => void | Promise<any>
};

export default function PromiseForm(props: PromiseFormProps) {
  const { onSubmit } = props;
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = submitEvent(e);

    if (onSubmit) {
      const form = e.currentTarget;
      form.classList.toggle('loading');
      const inputs = [form as HTMLElement].concat(
        Array.from(
          e.currentTarget.getElementsByTagName('input')
        ) as HTMLElement[]
      ).concat(
        (
          Array.from(
            e.currentTarget.getElementsByTagName('select')
          )
        ) as HTMLElement[]
      );

      const buttons = Array.from(
          e.currentTarget.getElementsByTagName('button')
      ) as HTMLElement[]

      const r = onSubmit(e, body);
      if (r instanceof Promise) {
        inputs.forEach(i => i.setAttribute('disabled', 'disabled'));
        buttons.forEach(i => i.setAttribute('disabled', 'disabled'));
        return new Promise((res: Function) => {
          r.finally(() => {
            form.classList.toggle('loading');
            inputs.forEach(i => i.removeAttribute('disabled'));
            buttons.forEach(i => i.removeAttribute('disabled'));
            res();
          })
        })
      }

      return Promise.resolve(r);
    }

    return Promise.resolve(undefined);
  }
  return <form {...props} onSubmit={onFormSubmit} />
}