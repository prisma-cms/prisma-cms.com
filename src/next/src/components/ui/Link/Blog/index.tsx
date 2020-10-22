import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Link from '..';

import { withStyles } from 'material-ui/styles';
import { BlogLinkProps } from './interfaces';

const styles = (theme: any) => {

  const {
    palette: {
      // background: {
      // },
      primary,
      // grey,
      getContrastText,
    },
  } = theme;

  // const backgroundColor = primary[500];
  const backgroundColor = "#39a71f";
  const color = getContrastText(backgroundColor);

  // const backgroundColorHover = "#39a71f";
  const backgroundColorHover = primary[500];
  const colorHover = getContrastText(backgroundColorHover);

  return {
    root: {
    },
    text: {

      "&.button": {
        fontSize: "0.8rem",
        display: "inline-block",
        backgroundColor,
        color,
        borderRadius: 3,
        margin: 3,
        padding: "1px 3px",

        "&:hover": {
          backgroundColor: backgroundColorHover,
          color: colorHover,
        },

        "&.nowrap": {
          whiteSpace: "nowrap" as "nowrap",
        },
      },

    },
  }
};


export class BlogLink extends Component<BlogLinkProps> {


  static propTypes = {
    variant: PropTypes.string,
  };


  static defaultProps = {

  }


  render() {

    const {
      object,
      children,
      classes,
      variant,
      ...other
    } = this.props;


    if (!object) {
      return null;
    }

    const {
      id,
      uri,
      name,
      longtitle,
    } = object;


    if (!id) {
      return null;
    }

    const name_str = name || id || '';

    return <Link
      href={uri}
      title={longtitle || name_str}
      classes={classes}
      textClassName={[variant, name_str.length < 25 ? "nowrap" : ""].join(" ")}
      {...other}
    >
      {children || name_str}
    </Link>
  }
}


export default withStyles(styles)((props: BlogLinkProps) => <BlogLink {...props} />);
