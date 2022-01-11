
```ts
  const handleValidateFailed = ({ errorFields }: { errorFields: { errors: string[] }[] }) => {
    console.log(`errorFields`, errorFields);
    message.error(errorFields[0].errors[0])
  }
```