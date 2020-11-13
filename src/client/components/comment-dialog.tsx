import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Comment, CommentText } from "@shared/model/comment";
import { Mutable, prior } from "jinaga-react";
import * as React from "react";
import { j } from "../jinaga-config";

export interface CommentDialogProps {
  comment: Comment;
  commentText: Mutable<CommentText, string>;
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

  begin() {
    this.setState({
      value: this.props.commentText.value,
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
    const comment = this.props.comment;
    const value = this.state.value;
    const commentText = this.props.commentText;
    j.fact(new CommentText(comment, value, prior(commentText)))
      .then(() => this.onClose());
  }
}