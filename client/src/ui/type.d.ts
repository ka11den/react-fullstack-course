namespace UI {
    type Input = {
        label: string;
        name: string;
        type: string;
        register: any;
        errors: any;
        accept?: string;
        onChange?: any;
    };

    type Button = {
        className?: string;
        type?: "submit" | "reset" | "button";
        onClick?: () => void;
        disabled?: boolean;
        children: ReactNode;
        title?: string;
    };

    type Checkbox = {
        className?: string;
        name: string;
        register: any;
        errors: any;
    };
}
