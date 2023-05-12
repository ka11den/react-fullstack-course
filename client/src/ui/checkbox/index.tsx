export function Checkbox({ className, name, register, errors }: UI.Checkbox): JSX.Element {
    return (
        <div className={className}>
            <input type="checkbox" {...register} />
            {errors[name] && (
                <p>{errors[name].message as string}</p>
            )}
        </div>
    );
}
