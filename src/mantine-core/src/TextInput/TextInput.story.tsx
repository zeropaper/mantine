import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { DEFAULT_THEME, MantineProvider } from '@mantine/theme';
import { LockClosedIcon } from '@modulz/radix-icons';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { TextInput } from './TextInput';
import { Button } from '../Button/Button';

function WrappedTextInput(
  props: Omit<React.ComponentProps<typeof TextInput>, 'value' | 'onChange'>
) {
  const [value, onChange] = useState('');
  return (
    <TextInput value={value} onChange={(event) => onChange(event.currentTarget.value)} {...props} />
  );
}

storiesOf('@mantine/core/TextInput', module)
  .add('General usage', () => (
    <div style={{ width: 300, padding: 20 }}>
      <WrappedTextInput label="text" placeholder="text" type="text" />
    </div>
  ))
  .add('With icon', () => (
    <div style={{ width: 300, padding: 20 }}>
      <WrappedTextInput label="text" placeholder="text" icon={<LockClosedIcon />} />
    </div>
  ))
  .add('With description', () => (
    <div style={{ width: 300, padding: 20 }}>
      <WrappedTextInput
        label="text"
        placeholder="text"
        description="Enter your name 2-30 characters"
      />
    </div>
  ))
  .add('Uncontrolled', () => (
    <div style={{ width: 300, padding: 20 }}>
      <TextInput label="Uncontrolled" placeholder="Uncontrolled" />
    </div>
  ))
  .add('Required', () => (
    <div style={{ width: 300, padding: 20 }}>
      <TextInput label="Required" placeholder="Required" required />
    </div>
  ))
  .add('Disabled', () => (
    <div style={{ width: 300, padding: 20 }}>
      <TextInput disabled label="Disabled" placeholder="Disabled" required />
    </div>
  ))
  .add('Error', () => (
    <div style={{ width: 300, padding: 20 }}>
      <TextInput label="With error" placeholder="With error" error="text too short" />
    </div>
  ))
  .add('Invalid without error', () => (
    <div style={{ width: 300, padding: 20 }}>
      <TextInput label="With error" placeholder="With error" error />
    </div>
  ))
  .add('Custom radius', () => (
    <div style={{ width: 300, padding: 20 }}>
      <TextInput label="Radius" placeholder="Radius" radius="lg" />
    </div>
  ))
  .add('Autofocus', () => (
    <div style={{ width: 300, padding: 20 }}>
      <TextInput label="Autofocus" placeholder="Autofocus" autoFocus />
    </div>
  ))
  .add('Dark theme', () => (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <div
        style={{ backgroundColor: DEFAULT_THEME.colors.dark[7], padding: 40, minHeight: '100vh' }}
      >
        <WrappedTextInput
          label="text"
          placeholder="text"
          description="Enter your name 2-30 characters"
        />
        <TextInput style={{ marginTop: 15 }} disabled label="text" placeholder="text" />
        <TextInput
          style={{ marginTop: 15 }}
          label="With error"
          placeholder="With error"
          error="text too short"
        />
      </div>
    </MantineProvider>
  ))
  // unfortunately, the usage of "form.register" is not working (with defaultValues)
  // but using the Controller component (below) will do the trick (although more verbose)
  .add('react-hook-form register', () => {
    const form = useForm<{
      optionalString?: string;
      requiredString: string;
    }>({
      defaultValues: {
        optionalString: 'not needed',
      },
    });
    const [lastSubmission, setLastSubmission] = useState<{ [k: string]: string } | null>(null);

    const { errors } = form.formState;
    const getErrorMessage = (fieldError?: FieldError) => {
      if (!fieldError) return null;

      if (fieldError.message) return fieldError.message;

      switch (fieldError.type) {
        case 'required':
          return 'This field is required';
        default:
          return 'The value of this field is invalid';
      }
    };

    return (
      <div style={{ display: 'flex', padding: '4px' }}>
        <form onSubmit={form.handleSubmit((submitted) => setLastSubmission(submitted))}>
          <TextInput
            label="Optional String"
            {...form.register('optionalString')}
            error={getErrorMessage(errors?.optionalString)}
          />

          <TextInput
            label="Required String"
            required
            {...form.register('requiredString', { required: true })}
            error={getErrorMessage(errors?.requiredString)}
          />

          <Button type="submit">Submit</Button>
        </form>

        <div>
          <div><code>form.getValues()</code></div>
          <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>

          <hr />

          <div>
            <div><code>form.watch(&apos;optionalString&apos;)</code></div>
            <div>{form.watch('optionalString')}</div>
          </div>

          <hr />

          <div>last submitted values</div>
          <pre>{JSON.stringify(lastSubmission, null, 2)}</pre>
        </div>
      </div>
    );
  })
  .add('react-hook-form controller', () => {
    const form = useForm<{
      optionalString?: string;
      requiredString: string;
    }>({
      defaultValues: {
        optionalString: 'not needed',
      },
    });
    const [lastSubmission, setLastSubmission] = useState<{ [k: string]: string } | null>(null);

    const getErrorMessage = (fieldError?: FieldError) => {
      if (!fieldError) return null;

      if (fieldError.message) return fieldError.message;

      switch (fieldError.type) {
        case 'required':
          return 'This field is required';
        default:
          return 'The value of this field is invalid';
      }
    };

    return (
      <div style={{ display: 'flex', padding: '4px' }}>
        <form onSubmit={form.handleSubmit((submitted) => setLastSubmission(submitted))}>
          <Controller
            name="optionalString"
            control={form.control}
            render={({ field: { ref, onBlur, onChange } }) => (
              <TextInput
                label="Optional String"
                elementRef={ref}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="requiredString"
            control={form.control}
            rules={{ required: true }}
            render={({ field: { ref, onBlur, onChange }, fieldState: { error } }) => (
              <TextInput
                label="Required String"
                required
                elementRef={ref}
                onBlur={onBlur}
                onChange={onChange}
                error={getErrorMessage(error)}
              />
            )}
          />

          <Button type="submit">Submit</Button>
        </form>

        <div>
          <div><code>form.getValues()</code></div>
          <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>

          <hr />

          <div>
            <div><code>form.watch(&apos;optionalString&apos;)</code></div>
            <div>{form.watch('optionalString')}</div>
          </div>

          <hr />

          <div>last submitted values</div>
          <pre>{JSON.stringify(lastSubmission, null, 2)}</pre>
        </div>
      </div>
    );
  });
