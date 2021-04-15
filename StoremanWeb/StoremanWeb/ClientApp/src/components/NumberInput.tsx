import * as React from "react";

export interface INumberInputProps {
    className?: string,
    onChange?: (v:string) => void,
    value?: string | number,
    integer?: boolean,
    readOnly?:boolean
}

export class NumberInput extends React.Component<INumberInputProps, { textValue:string}> {

    constructor(props: INumberInputProps) {
        super(props);
        this.state = { textValue: this.props.value ? this.props.value.toString().replace('.', ',') : "" };
    }

    formatText = e => {
        const NUMBER_DOT_COMMA = /^[\d,.]*$/;
        const MAX_DEC_DIGITS = /^\d*[,.]?\d{0,1}$/;
        const fieldValue = e.target.value;
        const fieldHasCommaOrDot = fieldValue.includes('.') || fieldValue.includes(',');
        const keyIsCommaOrDot = e.key === '.' || e.key === ',';

        if (!NUMBER_DOT_COMMA.test(e.key) || (keyIsCommaOrDot && (fieldHasCommaOrDot || this.props.integer)) || (!this.props.integer && !MAX_DEC_DIGITS.test(fieldValue)))
            e.preventDefault();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value && !isNaN((this.props.value as any))) {
            this.setState({ textValue: this.props.value ? this.props.value.toString().replace('.', ',') : "" });
        }
    }

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
                readOnly={this.props.readOnly}
                type="text"
                value={this.state.textValue}
                onKeyPress={this.formatText}
                onChange={ this.onTextChange }
            />
        );
    }
}


