import * as React from "react";

export interface INumberInputProps {
    className?: string,
    step?: string,
    min?: string,
    onChange?: (v:string) => void,
    value?:string
}

export class NumberInput extends React.Component<INumberInputProps, { textValue:string}> {

    constructor(props: INumberInputProps) {
        super(props);
        this.state = { textValue: this.props.value ? this.props.value.replace('.', ',') : "" };
    }

    formatText = e => {
        const NUMBER_DOT_COMMA = /^[\d,.]*$/;
        const fieldValue = e.target.value;
        const fieldHasCommaOrDot = fieldValue.includes('.') || fieldValue.includes(',');
        const keyIsCommaOrDot = e.key === '.' || e.key === ',';

        if (!NUMBER_DOT_COMMA.test(e.key) || (keyIsCommaOrDot && fieldHasCommaOrDot))
            e.preventDefault();

        /*
         * step={this.props.step ? this.props.step : ""}
                min={this.props.min ? this.props.min : ""}
         */
    };

    onTextChange = (e: any) => {
        let v = e.target.value;
        this.setState({ textValue: v.replace('.', ',') });
        if (this.props.onChange)
            this.props.onChange(v.replace(',', '.'));
    };

    render() {
        return (
            <input
                className={this.props.className ? "form-control " + this.props.className : "form-control"}
                type="text"
                value={this.state.textValue}
                onKeyPress={this.formatText}
                onChange={ this.onTextChange }
            />
        );
    }
}


