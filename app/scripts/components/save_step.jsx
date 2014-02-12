/** @jsx React.DOM */
define(function (require) {
    'use strict';

    var mediator = require('mediator');
    var React = require('react');
    var classSet = React.addons.classSet;
    var WithMediator = require('components/with_mediator');
    var _ = require('lodash');

    var ProgressBar = React.createClass({
        render: function () {
            var perc = ~~(this.props.value /
                          (this.props.max - this.props.min) * 100) + '%';

            return <div className="progress progress-striped active">
                <div className="progress-bar" role="progressbar"
                    aria-valuenow={this.props.value}
                    aria-valuemin={this.props.min}
                    aria-valuemax={this.props.max}
                    style={{ width: perc }}>
                    <span className="sr-only">{perc + ' complete'}</span>
                </div>
            </div>;
        }
    });

    return React.createClass({
        mixins: [WithMediator(mediator)],

        getInitialState: function () {
            return {
                saving: null
            };
        },

        componentDidMount: function () {
            this.on('dataCreateCTL', this.handleCTLCreated);
            // For now.
            this.on('dataOverwriteCTL', this.handleCTLCreated);
            this.on('dataCreateCTLProgress', this.handleCTLProgress);
            this.on('dataOverwriteCTLProgress', this.handleCTLProgress);
            this.on('dataError', this.handleDataError);
        },

        handleSubmit: function (e) {
            e.preventDefault();
            var saveType = this.refs.form.getDOMNode().saveType.value;

            /*jshint camelcase:false */
            this.trigger(saveType === 'overwrite' ? 'uiOverwriteCTL' : 'uiCreateCTL', {
                id: this.props.timeline.id,
                name: this.refs.name.getDOMNode().value,
                description: 'Automatically created by ctlmngr',
                tweetIds: this.props.tweets.map(function (x) { return x.id_str; })
            });

            this.setState({
                saving: { value: 0, total: -1 }
            });
        },

        handleCTLCreated: function () {
            // TODO: Improve?

            this.setState({
                saving: null
            });
            window.alert('CTL created. Better check TweetDeck if this actually worked.');
        },

        handleCTLProgress: function (data) {
            this.setState({
                saving: _.assign(this.state.saving, data)
            });
        },

        handleDataError: function (e) {
            // TODO: Improve?
            console.error(e);
            window.alert('Shit went haywire.');
        },

        renderProgress: function () {
            if (!this.state.saving) {
                // XXX: Is there a better pattern for this?
                return <div />;
            }

            return <ProgressBar className="l-marg-v-n"
                min="0"
                max={this.state.saving.total}
                value={this.state.saving.value} />;
        },

        render: function () {
            // TODO: Description and option to overwrite existing
            if (!this.props.timeline) {
                return <div />;
            }

            var innerFormClasses = classSet({
                's-disabled': this.state.saving
            });

            return (
                <section className="clearfix">
                    <form className="center-block dim-half-width" ref="form" onSubmit={this.handleSubmit}>
                        <h2>Step 3: Save your Custom Timeline</h2>

                        {this.renderProgress()}
                        <div className={innerFormClasses}>
                        <div className="input-group l-marg-b-n">
                            <label className="radio-inline">
                                <input name="saveType" type="radio" value="create" defaultChecked />Create New
                            </label>
                            <label className="radio-inline">
                                <input name="saveType" type="radio" value="overwrite" />Overwrite
                            </label>
                        </div>
                        <div className="input-group">
                            <input ref="name"
                                className="form-control"
                                type="text"
                                maxLength="25"
                                placeholder="Name of your new Timeline"
                                defaultValue={this.props.timeline.name} />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="submit">Save</button>
                            </span>
                        </div>
                        </div>
                    </form>
                </section>
            );
        }
    });

});
