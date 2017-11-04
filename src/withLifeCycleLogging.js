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

                // Most lifecycle methods are manufactured and assigned to prototype below.
                
                render() {
                    const opts = this.options();
                    if (opts.active && opts.render) {
                        logger.log(this, opts.message);
                    }
                    return <WrappedComponent {...omit(this.props, 'lifeCycleLogging')}/>
                }
            }

            [
                'componentWillMount',
                'componentDidMount',
                'componentWillReceiveProps',
                'componentWillUpdate',
                'componentDidUpdate',
                'componentWillUnmount',
                'componentDidCatch',
            ].forEach(methodName => {
                // This creates a dynamically named function. It creates an anonymous function and then gives it
                // a name by assigning it to a named property. Only way to do it that I know of. Works in Chrome.
                // A named function is necessary so that the logger can log an informative method name.
                const methods = {
                    [methodName]: function() {
                        const opts = this.options();
                        if (opts.active && opts[methodName]) {
                            logger.log(this, opts.message);
                        }
                    }
                };
                Wrapper.prototype[methodName] = methods[methodName];
            });

            Wrapper.propTypes = {
                lifeCycleLogging: PropTypes.object,
            };

            Wrapper.displayName = getDisplayName(WrappedComponent);

            return Wrapper;
        }
    }

}

export default new WithLifeCycleLogging();