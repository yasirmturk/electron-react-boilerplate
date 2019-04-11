import React from 'react';

export default function editable(WrappedComponent, InputComponent) {
  return class extends React.Component {
    state = {
      editing: false
    };

    toggleEdit = e => {
      e.stopPropagation();
      const { editing } = this.state;
      if (editing) {
        this.cancel();
      } else {
        this.edit();
      }
    };

    handleKey = e => {
      const { key } = e;
      switch (key) {
        case 'Enter':
          this.save();
          break;
        case 'Escape':
          this.cancel();
          break;
        default:
      }
    };

    edit = () => {
      this.setState({ editing: true }, () => {
        this.input.focus();
      });
    };

    save = () => {
      const { defaultValue, inputProps, onSave } = this.props;
      const { value } = this.input;
      console.log(`done ${value}`);
      this.setState({ editing: false }, () => {
        if (onSave && defaultValue !== value) {
          const key = inputProps && inputProps.name;
          onSave(key ? { [key]: value } : value);
        }
      });
    };

    cancel = () => this.setState({ editing: false });

    renderEditing = () => {
      const { defaultValue, inputProps, style } = this.props;
      return (
        <InputComponent
          defaultValue={defaultValue}
          onKeyDown={this.handleKey}
          onBlur={this.save}
          inputRef={i => {
            this.input = i;
          }}
          {...inputProps}
          style={style}
        />
      );
    };

    renderNormal = () => {
      const { defaultValue, inputProps, onSave, ...rest } = this.props;
      return (
        <WrappedComponent onClick={this.toggleEdit} {...rest}>
          {defaultValue}
        </WrappedComponent>
      );
    };

    render() {
      const { editing } = this.state;
      return editing ? this.renderEditing() : this.renderNormal();
    }
  };
}
