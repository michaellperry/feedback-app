import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as React from "react";

export function useEditor(saveCommentText: (value: string) => Promise<void>) : [ (value: string) => void, () => JSX.Element ] {
  const dialogRef = React.useRef<CommentDialog>(null);

  const begin = (initialValue: string) => {
    dialogRef.current.begin(initialValue);
  };

  const Editor = () => (
    <CommentDialog
      ref={dialogRef}
      onSave={saveCommentText} />
  );

  return [ begin, Editor ];
}

export interface CommentDialogProps {
  onSave: (value: string) => Promise<void>;
};

interface CommentDialogState {
  value: string;
  editing: boolean;
}

export class CommentDialog extends React.Component<CommentDialogProps, CommentDialogState> {
  constructor(props: CommentDialogProps) {
    super(props);

    this.state = {
      value: "",
      editing: false
    };
  }

  render() {
    return (
      <Dialog open={this.state.editing} onClose={() => this.onClose()}>
        <DialogTitle>Edit Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>What did you mean to say?</DialogContentText>
          <TextField
            value={this.state.value}
            onChange={e => this.setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.onSave()} variant="contained" color="primary">Save</Button>
          <Button onClick={() => this.onClose()} color="default">Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }

  begin(value: string) {
    this.setState({
      value,
      editing: true
    });
  }

  private setValue(value: string) {
    this.setState({
      value
    });
  }

  private onClose() {
    this.setState({
      editing: false
    });
  }

  private onSave() {
    const value = this.state.value;
    this.props.onSave(value).then(() => this.onClose());
  }
}