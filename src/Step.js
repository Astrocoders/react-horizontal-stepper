import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

const isFunction = _ => typeof _ === 'function'

export default class Step extends Component {
  constructor() {
    super()
    this.getStyles = this.getStyles.bind(this)
  }

  getStyles() {
    const {
      activeColor,
      completeColor,
      defaultColor,
      circleFontColor,
      activeTitleColor,
      completeTitleColor,
      defaultTitleColor,
      size,
      circleFontSize,
      titleFontSize,
      circleTop,
      titleTop,
      width,
      completeOpacity,
      activeOpacity,
      defaultOpacity,
      completeTitleOpacity,
      activeTitleOpacity,
      defaultTitleOpacity,
      barStyle,
      defaultBarColor,
      completeBarColor,
      defaultBorderColor,
      completeBorderColor,
      activeBorderColor,
      defaultBorderStyle,
      completeBorderStyle,
      activeBorderStyle,
      activeCircleFontColor,
      defaultCircleFontColor,
      fontFamily,
      circleCursor,
      barHeight,
      onClick,
      completed,
    } = this.props

    return {
      step: {
        width: `${width}%`,
        display: 'table-cell',
        position: 'relative',
        paddingTop: circleTop,
      },
      circle: {
        width: size,
        height: size,
        margin: '0 auto',
        backgroundColor: defaultColor,
        borderRadius: '50%',
        textAlign: 'center',
        fontSize: circleFontSize,
        color: circleFontColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: defaultOpacity,
        borderWidth: defaultBorderColor ? 3 : 0,
        borderColor: defaultBorderColor,
        borderStyle: defaultBorderStyle,
        cursor: circleCursor,
      },
      activeCircle: {
        backgroundColor: activeColor,
        opacity: activeOpacity,
        borderWidth: activeBorderColor ? 3 : 0,
        borderColor: activeBorderColor,
        borderStyle: activeBorderStyle,
        cursor: circleCursor,
      },
      completedCircle: {
        backgroundColor: completeColor,
        opacity: completeOpacity,
        borderWidth: completeBorderColor ? 3 : 0,
        borderColor: completeBorderColor,
        borderStyle: completeBorderStyle,
        cursor: circleCursor,
      },
      index: {
        lineHeight: `${size + circleFontSize / 4}px`,
        color: circleFontColor,
        fontFamily: fontFamily,
        cursor: completed && isFunction(onClick) ? 'pointer' : 'default',
      },
      activeIndex: {
        lineHeight: `${size + circleFontSize / 4}px`,
        color: activeCircleFontColor,
        fontFamily: fontFamily,
      },
      title: {
        marginTop: titleTop,
        fontSize: titleFontSize,
        fontWeight: '300',
        textAlign: 'center',
        display: 'block',
        color: defaultTitleColor,
        opacity: defaultTitleOpacity,
        fontFamily: fontFamily,
      },
      activeTitle: {
        color: activeTitleColor,
        opacity: activeTitleOpacity,
        fontFamily: fontFamily,
        cursor: isFunction(onClick) ? 'pointer' : 'default',
      },
      completedTitle: {
        color: completeTitleColor,
        opacity: completeTitleOpacity,
        fontFamily: fontFamily,
        cursor: isFunction(onClick) ? 'pointer' : 'default',
      },
      leftBar: {
        position: 'absolute',
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: barHeight || 1,
        borderTopColor: defaultBarColor,
        left: 0,
        right: '50%',
        marginRight: size / 2,
        opacity: defaultOpacity,
      },
      rightBar: {
        position: 'absolute',
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: barHeight || 1,
        borderTopColor: defaultBarColor,
        right: 0,
        left: '50%',
        marginLeft: size / 2,
        opacity: defaultOpacity,
      },
      completedBar: {
        borderTopStyle: barStyle,
        borderTopWidth: barHeight || 1,
        borderTopColor: completeBarColor,
        opacity: completeOpacity,
      },
    }
  }

  getInnerContent() {
    const { active, completed, checkIcon, index, href, onClick } = this.props
    const styles = this.getStyles()

    const handleClick = e => onClick(e, index)

    if (active) {
      return (
        <span onClick={handleClick} style={styles.activeIndex}>
          {index + 1}
        </span>
      )
    }

    if (completed) {
      if (checkIcon) {
        return (
          <span onClick={handleClick} style={styles.index}>
            {checkIcon}
          </span>
        )
      }
      return (
        <span
          style={Object.assign({}, styles.index, {
            color: this.props.defaultCircleFontColor || styles.index.color,
          })}
          onClick={handleClick}
        >
          {index + 1}
        </span>
      )
    }

    return <span style={styles.index}>{index + 1}</span>
  }

  render() {
    const { title, index, active, completed, first, isLast, href, onClick } = this.props

    const styles = this.getStyles()
    const circleStyle = Object.assign(
      styles.circle,
      completed ? styles.completedCircle : {},
      active ? styles.activeCircle : {},
    )
    const titleStyle = Object.assign(
      styles.title,
      completed ? styles.completedTitle : {},
      active ? styles.activeTitle : {},
    )
    const leftStyle = Object.assign(
      styles.leftBar,
      active || completed ? styles.completedBar : {},
    )
    const rightStyle = Object.assign(
      styles.rightBar,
      completed ? styles.completedBar : {},
    )

    return (
      <div style={styles.step}>
        <div style={circleStyle}>{this.getInnerContent()}</div>
        {active || completed ? (
          <a href={href} onClick={onClick} style={titleStyle}>
            {title}
          </a>
        ) : (
          <div style={titleStyle}>{title}</div>
        )}
        {!first && <div style={leftStyle} />}
        {!isLast && <div style={rightStyle} />}
      </div>
    )
  }
}

Step.defaultProps = {
  activeColor: '#5096FF',
  completeColor: '#5096FF',
  defaultColor: '#E0E0E0',
  activeTitleColor: '#000',
  completeTitleColor: '#000',
  defaultTitleColor: '#757575',
  circleFontColor: '#FFF',
  size: 32,
  circleFontSize: 16,
  titleFontSize: 16,
  circleTop: 24,
  titleTop: 8,
  defaultBarColor: '#E0E0E0',
  barStyle: 'solid',
  borderStyle: 'solid',
}

Step.propTypes = {
  width: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
  completeColor: PropTypes.string,
  defaultColor: PropTypes.string,
  activeTitleColor: PropTypes.string,
  completeTitleColor: PropTypes.string,
  defaultTitleColor: PropTypes.string,
  circleFontColor: PropTypes.string,
  size: PropTypes.number,
  circleFontSize: PropTypes.number,
  titleFontSize: PropTypes.number,
  circleTop: PropTypes.number,
  titleTop: PropTypes.number,
  title: PropTypes.string,
  index: PropTypes.number,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  first: PropTypes.bool,
  isLast: PropTypes.bool,
  completeOpacity: PropTypes.string,
  activeOpacity: PropTypes.string,
  defaultOpacity: PropTypes.string,
  completeTitleOpacity: PropTypes.string,
  activeTitleOpacity: PropTypes.string,
  defaultTitleOpacity: PropTypes.string,
  barStyle: PropTypes.string,
  defaultBarColor: PropTypes.string,
  completeBarColor: PropTypes.string,
  defaultBorderColor: PropTypes.string,
  completeBorderColor: PropTypes.string,
  activeBorderColor: PropTypes.string,
  defaultBorderStyle: PropTypes.string,
  completeBorderStyle: PropTypes.string,
  activeBorderStyle: PropTypes.string,
}
