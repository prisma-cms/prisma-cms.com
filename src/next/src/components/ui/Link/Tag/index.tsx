import React, { Component } from 'react'


import Link from '..';

import { withStyles } from 'material-ui/styles';
import { TagLinkProps } from './interfaces';

const styles = (theme: any) => {

  const {
    palette: {
      // background: {
      // },
      primary,
      grey,
      getContrastText,
    },
  } = theme;

  // const backgroundColor = primary[500];
  const backgroundColor = grey[200];
  const color = getContrastText(backgroundColor);

  const backgroundColorActive = primary[600];
  const colorActive = getContrastText(backgroundColorActive);

  // const backgroundColorHover = "#39a71f";
  const backgroundColorHover = primary[500];
  const colorHover = getContrastText(backgroundColorHover);

  return {
    root: {
    },
    text: {
      fontSize: "0.8rem",
      display: "inline-block",
      backgroundColor,
      color,
      borderRadius: 3,
      margin: 3,
      padding: "1px 3px",

      "&.active": {
        backgroundColor: backgroundColorActive,
        color: colorActive,
      },

      "&:hover": {
        backgroundColor: backgroundColorHover,
        color: colorHover,
      },
    },
  }
};


export class TagLink extends Component<TagLinkProps> {

  render() {

    const {
      object,
      classes,
      ...other
    } = this.props;


    if (!object) {
      return null;
    }

    const {
      name,
    } = object;


    if (!name) {
      return null;
    }

    return <Link
      href={`/tag/${name}`}
      title={name}
      classes={classes}
      {...other}
    >
      {name}
    </Link>
  }
}


export default withStyles(styles)((props: TagLinkProps) => <TagLink {...props} />);
