import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component {
    render() {
        const { fields: { title, categories, content}, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.props.createPost)}>
                <h3>Create A New Post</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name={title.name}
                        onChange={title.onChange}
                        onFocus={title.onFocus}
                        value={title.value}
                    />
                    <div className="test-help">
                        {title.error}
                    </div>
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <input 
                        type="text"
                        className="form-control"
                        name={categories.name}
                        onChange={categories.onChange}
                        onFocus={categories.onFocus}
                        value={categories.value}
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name={content.name}
                        onChange={content.onChange}
                        onFocus={content.onFocus}
                        value={content.value}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
        errors.title = 'Enter a username';
    }

    return errors;
}

//connect: 1st mapStateToProps, 2nd mapDispatchToProps
//reduxForm: 1st form config, 2nd mapStateToProps, 3rd map DispatchToProps

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);