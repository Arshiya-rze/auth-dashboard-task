import styles from './Input.module.scss';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
    return (
        <div className={styles.inputWrapper}>
            <label>{label}</label>
            <input ref={ref} {...props} />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
});

export default Input;