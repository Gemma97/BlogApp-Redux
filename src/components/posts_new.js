import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
            .then(() => { 
                // Blog post has been created, navigate the user to the index.
                // We navigate by calling this.context.router.push with the new path to navigate to.
                this.context.router.push('/');
            });
    }
    
    render() {
        const { fields: { title, categories, content}, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                <div className={ `form-group ${title.touched && title.invalid ? 'has-danger': ''}`}>
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
                        {title.touched ? title.error : '' }
                    </div>
                </div>
                <div className={ `form-group ${categories.touched && categories.invalid ? 'has-danger': ''}`}>
                    <label>Categories</label>
                    <input 
                        type="text"
                        className="form-control"
                        name={categories.name}
                        onChange={categories.onChange}
                        onFocus={categories.onFocus}
                        value={categories.value}
                    />
                    <div className="test-help">
                        {categories.touched ? categories.error : '' }
                    </div>
                </div>

                <div className={ `form-group ${content.touched && content.invalid ? 'has-danger': ''}`}>
                    <label>Content</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name={content.name}
                        onChange={content.onChange}
                        onFocus={content.onFocus}
                        value={content.value}
                    />
                    <div className="test-help">
                        {content.touched ? content.error : '' }
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
        errors.title = 'Enter a title';
    }

    if(!values.categories) {
        errors.categories = 'Enter categories';
    } 

    if(!values.content) {
        errors.content = 'Enter content';
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