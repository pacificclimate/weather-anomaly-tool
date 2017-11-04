// HOC that logs component lifecycle events.
//
// Exports a singleton. See "Module instance" in https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae.
//
// Supports a cascade of logging options, later ones overriding earlier ones:
//
//  - global options set by WithLifeCycleLogging.configure()
//  - HOC-creation options set by WithLifeCycleLogging.hoc()
//  - instance options set with component property lifeCycleLogging
//
// This HOC is written according to the guidelines in https://reactjs.org/docs/higher-order-components.html.
// Specifically, it:
//
//  - uses composition (https://reactjs.org/docs/higher-order-components.html#dont-mutate-the-original-component-use-composition)
//
//  - passes unrelated props through to the wrapped component (https://reactjs.org/docs/higher-order-components.html#convention-pass-unrelated-props-through-to-the-wrapped-component)
//
//  - maximizes composability (https://reactjs.org/docs/higher-order-components.html#convention-maximizing-composability
//        - WithLifeCycleLogging.hoc() returns a composable HOC, that is, it returns a function that takes a single
//          argument (a component) and returns a wrapped component. This type of HOC (a function of one argument) can
//          be easily composed with other such HOCs.
//        - The argument(s) to WithLifeCycleLogging.hoc() specify details of the HOC it returns. In this case, the
//          arguments locally override the global configuration options. This is likely unnecessary but was included
//          to demonstrate the concept.
//
//  - wraps the display name (https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging)
//
// Usage:
//
//  In App.js (or other high-level component):
//
//      import withLifeCycleLogging from '../../withLifeCycleLogging';
//      ...
//      withLifeCycleLogging.configure(options);
//
//  In the definition of a component (common use case):
//
//      import withLifeCycleLogging from '../../withLifeCycleLogging';
//      ...
//
//      class MyComponent extends Component {
//          ...
//      }
//      
//      export default withLifeCycleLogging.hoc(options)(MyComponent);
//
//  Alternatively, defining a wrapped component some other component:
//
//      import withLifeCycleLogging from '../../withLifeCycleLogging';
//      ...
//      ALoggingComponent = withLifeCycleLogging.hoc(options)(AComponent);
//
//  In the instantiation of a component:
//
//      <ALoggingComponent lifeCycleLogging={options} />
//


import React from 'react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

import logger from './logger';


function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


class WithLifeCycleLogging {
    constructor() {
        this._options = {
            active: true,
            message: '(lifeCycleLogging)',
            componentWillMount: true,
            componentDidMount: true,
            componentWillReceiveProps: true,
            componentWillUpdate: true,
            componentDidUpdate: true,
            componentWillUnmount: true,
            componentDidCatch: true,
            render: true,
            group: false,
        };
    }

    configure(options) {
        return Object.assign(this._options, options);
    }

    hoc(hocOptions={}) {
        const self = this;
        
        // This function prevents the closure of the returned function from capturing global options at time of
        // creation rather than at time of execution.
        function localOptions(instanceOptions) {
            return Object.assign({}, self._options, hocOptions, instanceOptions);
        }

        return function(WrappedComponent) {
            if (!logger.isActive()) {
                return WrappedComponent;
            }

            class Wrapper extends WrappedComponent {
                options() {
                    return localOptions(this.props.lifeCycleLogging);
                }
                
                componentWillMount() {
                    const opts = this.options();
                    if (opts.active && opts.componentWillMount) {
                        logger.log(this, opts.message);
                    }
                }

                componentDidMount() {
                    const opts = this.options();
                    if (opts.active && opts.componentDidMount) {
                        logger.log(this, opts.message);
                    }
                }

                componentWillReceiveProps() {
                    const opts = this.options();
                    if (opts.active && opts.componentWillReceiveProps) {
                        logger.log(this, opts.message);
                    }
                }

                componentWillUpdate() {
                    const opts = this.options();
                    if (opts.active && opts.componentWillUpdate) {
                        logger.log(this, opts.message);
                    }
                }

                componentDidUpdate() {
                    const opts = this.options();
                    if (opts.active && opts.componentDidUpdate) {
                        logger.log(this, opts.message);
                    }
                }

                componentWillUnmount() {
                    const opts = this.options();
                    if (opts.active && opts.componentWillUnmount) {
                        logger.log(this, opts.message);
                    }
                }

                componentDidCatch() {
                    const opts = this.options();
                    if (opts.active && opts.componentDidCatch) {
                        logger.log(this, opts.message);
                    }
                }

                render() {
                    const opts = this.options();
                    if (opts.active && opts.render) {
                        logger.log(this, opts.message);
                    }
                    return <WrappedComponent {...omit(this.props, 'lifeCycleLogging')}/>
                }
            }

            Wrapper.propTypes = {
                lifeCycleLogging: PropTypes.object,
            };

            Wrapper.displayName = getDisplayName(WrappedComponent);

            return Wrapper;
        }
    }

}

export default new WithLifeCycleLogging();