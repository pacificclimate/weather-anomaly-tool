import React from 'react';

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

    hoc(overrideOptions={}) {
        const self = this;
        
        function options() {
            return Object.assign({}, self._options, overrideOptions);
        }

        return function(WrappedComponent) {
            if (!options().active || !logger.isActive()) {
                return WrappedComponent;
            }

            class Wrapper extends WrappedComponent {
                componentWillMount() {
                    const opts = options();
                    if (opts.componentWillMount) {
                        logger.log(this, opts.message);
                    }
                }

                componentDidMount() {
                    const opts = options();
                    if (opts.componentDidMount) {
                        logger.log(this, opts.message);
                    }
                }

                componentWillReceiveProps() {
                    const opts = options();
                    if (opts.componentWillReceiveProps) {
                        logger.log(this, opts.message);
                    }
                }

                componentWillUpdate() {
                    const opts = options();
                    if (opts.componentWillUpdate) {
                        logger.log(this, opts.message);
                    }
                }

                componentDidUpdate() {
                    const opts = options();
                    if (opts.componentDidUpdate) {
                        logger.log(this, opts.message);
                    }
                }

                componentWillUnmount() {
                    const opts = options();
                    if (opts.componentWillUnmount) {
                        logger.log(this, opts.message);
                    }
                }

                componentDidCatch() {
                    const opts = options();
                    if (opts.componentDidCatch) {
                        logger.log(this, opts.message);
                    }
                }

                render() {
                    const opts = options();
                    if (opts.render) {
                        logger.log(this, opts.message);
                    }
                    return <WrappedComponent {...this.props}/>
                }
            }

            Wrapper.displayName = getDisplayName(WrappedComponent);
            return Wrapper;
        }
    }

}

export default new WithLifeCycleLogging();