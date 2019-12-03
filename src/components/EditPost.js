import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
// Redux stuff
import { connect } from 'react-redux';
import { editPost, clearErrors } from '../redux/actions/dataactions';
import { Tooltip } from '@material-ui/core';

const styles = {
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10,
        background: "#daaa00",
        fontWeight: "bolder",
        fontSize: "18px",
        borderRadius: 3,
        border: 0,
        color: "black",
        height: 40,
        padding: "0 30px"
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '85%',
        top: '6%'
    }

}
class EditPost extends Component {

    state = {
        open: false,
        body: {},
        errors: {},
        username: localStorage.username

    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: this.props.body, open: false, errors: {} });
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    };
    handleChange = (event) => {
        this.setState({ errors: {} });
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        let { body, errors } = this.state;
        if (body === "") {
            errors["body"] = "* Post something......";
            this.setState({ errors });
            return;
        }
        this.props.addPost({ body: this.state.body, userid: this.state.username});
    };
    render() {
        const { errors, username } = this.state;
        const {
            classes,
            UI: { loading }
        } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit Post" placement="top">
                    <Button onClick={this.handleOpen} tip="Edit existing Post !" color="primary">
                        <EditIcon color="primary"></EditIcon>
                    </Button>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <Button
                        tip="Close"
                        onClick={this.handleClose}
                        className={classes.closeButton}>
                        <CloseIcon />
                    </Button>
                    <DialogTitle>Edit Post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                multiline
                                rows="6"
                                //value={this.props.body}
                                placeholder={`What's on your mind, ${username}?`}
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Post
                {loading && (
                                    <CircularProgress
                                        size={30}
                                        className={classes.progressSpinner}
                                    />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}
EditPost.propTypes = {
    editPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { editPost, clearErrors }
)(withStyles(styles)(EditPost));
