import React from 'react';
import {portals} from '/lib/configs/portals';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      header: { marginTop: 0, marginBottom: '0.5rem' },
      subHeader: { textTransform: 'none', color: '#555555' }
    };
  }

  portalColor() {
    const portal = this.props.portal || 'EarthRef.org';
    return portals[portal] && portals[portal].color || 'green';
  }

  renderChildren () {
    return (
      <div className="content">
        {React.Children.map(this.props.children, (child, i) => {
          if (child.props.className === 'title')
            child = React.cloneElement(child, { className: 'ui header ' + this.portalColor(), style: this.styles.header});
          if (child.props.className === 'small title')
            child = React.cloneElement(child, { className: 'ui small header ' + this.portalColor(), style: this.styles.header});
          if (child.props.className.indexOf('statistic') !== -1)
            child = React.cloneElement(child, { className: child.props.className + ' ' + this.portalColor()});
          if (child.props.className === 'subtitle')
            child = React.cloneElement(child, { className: 'ui sub header', style: this.styles.subHeader});
          return child;
        })}
      </div>
    );
  }

  render() {
    let {className, portal, tooltip, position, ...props} = this.props;
    className = 'ui icon header basic fluid button ' + this.portalColor() + ' ' +
      className + ' er-icon-button';
    return (
      <div className={className} {...props}>
      {(this.props.href ?
        <a href={this.props.href} data-tooltip={tooltip} data-position={position}>
          {this.renderChildren()}
        </a>
      :
        <div data-tooltip={tooltip} data-position={position}>
          {this.renderChildren()}
        </div>
      )}
      </div>);
  }

}