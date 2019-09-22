import React from "react";
import { loadMoreTasks } from "../../actions/taskActions";
import { connect } from "react-redux";

function mapStateToProps(state, ownProps) {
    return {
        page: "" + state.page,
        query: "" + state.query,
        hasMore: state.hasMore,
    }
}

const withInfiniteScroll = (Component) => connect(mapStateToProps)(
    class extends React.Component {

        refuseScroll = false;

        fetchMore = async () => {
            let nextPage = "" + (+this.props.page + 1);
            let pagedQuery = this.props.query ? this.props.query + `&page=${nextPage}` :
                `?page=${nextPage}`;
            await this.props.dispatch(loadMoreTasks(pagedQuery));
        }
        onScroll = async () => {
            if (!this.props.hasMore || this.refuseScroll) return;
            this.refuseScroll = true;
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 250))
                await this.fetchMore();
            this.refuseScroll = false;
        }
        componentDidMount() {
            window.addEventListener('scroll', this.onScroll, false);
        }
        componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll, false);
        }
        render = () => (
            <div className="list">
                <Component {...this.props} />
            </div>

        )
    }
);

export default withInfiniteScroll;