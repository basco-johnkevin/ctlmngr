define(function (require) {
    'use strict';
    var React = require('react');

    return React.createClass({
        displayName: 'Tweet',

        render: function () {
            var tweet = this.props.tweet;

            /*jshint camelcase:false */
            return <article className="tweet media l-marg-b-n">
                <header className="tweet__header l-marg-b-s">
                    <a className="media" target="_blank" href={'https://twitter.com/' + tweet.user.screen_name} rel="author">
                        <img className="pull-left tweet__avatar img-rounded" src={tweet.user.profile_image_url_https} alt={'@' + tweet.user.screen_name + ' Avatar'} />
                    </a>
                    <b className="fullname">{tweet.user.name}</b>
                    <small className="screenname text-muted l-marg-l-n">
                        <span className="at">@</span>
                        {tweet.user.screen_name}
                    </small>
                    <a href={'https://twitter.com/intent/user?screen_name=' + tweet.user.screen_name}
                        target="_blank"
                        className="tweet__main-action btn btn-default btn-xs">
                        <i className="icon icon--follow" title="Follow" /> Follow
                    </a>
                </header>
                <div className="media-body">
                    <div className="tweet__body">{tweet.text}</div>
                    <footer className="tweet__footer">
                        <a href={'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str}
                            target="_blank">
                            <time className="tweet__time text-muted small" dateTime={tweet.created_at}>
                                {tweet.created_at}
                            </time>
                        </a>
                        <div className="pull-right">
                            <a href={'https://twitter.com/intent/tweet?in_reply_to=' + tweet.id_str}
                                target="_blank"
                                className="tweet__action">
                                <i className="icon icon--reply" title="Reply" />
                            </a>
                            <a href={'https://twitter.com/intent/retweet?tweet_id=' + tweet.id_str}
                                target="_blank"
                                className="tweet__action">
                                <i className="icon icon--retweet" title="Retweet" />
                            </a>
                            <a href={'https://twitter.com/intent/favorite?tweet_id=' + tweet.id_str}
                                target="_blank"
                                className="tweet__action">
                                <i className="icon icon--favorite" title="Favorite" />
                            </a>
                        </div>
                    </footer>
                </div>
            </article>;
        }
    });
});
