// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import Editor from "@modxclub/react-editor";

// import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

// import withStyles from "material-ui/styles/withStyles";
// import { Typography } from 'material-ui';
// import SendIcon from 'material-ui-icons/Send';

// import Grid from "@prisma-cms/front/lib/modules/ui/Grid";

// import moment from "moment";

// import {
//   TopicLink,
//   UserLink,
//   BlogLink,
//   CommentLink,
// } from "@modxclub/ui"

// const styles = theme => {

//   return {

//     root: {
//       margin: "30px 0 0",
//       borderTop: "1px solid #ddd",
//       padding: "20px 0",
//     },

//     addCommentTitle: {
//       marginBottom: 15,
//     },
//   }

// }

// class CommentView extends EditableView {

//   static propTypes = {
//     ...EditableView.propTypes,
//     classes: PropTypes.object.isRequired,
//   };

//   static defaultProps = {
//     ...EditableView.defaultProps,
//     SaveIcon: SendIcon,
//   };

//   static contextTypes = {
//     ...EditableView.contextTypes,
//     openLoginForm: PropTypes.func.isRequired,
//   };

//   // constructor(props){

//   //   super(props);

//   // }

//   canEdit() {

//     const {
//       user: currentUser,
//     } = this.context;

//     const {
//       id: currentUserId,
//       sudo,
//     } = currentUser || {};

//     const {
//       id,
//       CreatedBy,
//     } = this.getObjectWithMutations() || {};

//     const {
//       id: createdById,
//     } = CreatedBy || {}

//     return !id || (createdById && createdById === currentUserId) || sudo === true;
//   }

//   save() {

//     const {
//       user: currentUser,
//       openLoginForm,
//     } = this.context;

//     if (!currentUser) {

//       return openLoginForm();
//     }

//     return super.save();
//   }

//   getCacheKey() {

//     const {
//       id,
//     } = this.getObject() || {};

//     return `comment_${id || "new"}`;
//   }

//   renderHeader() {

//     const {
//       classes,
//     } = this.props;

//     const object = this.getObjectWithMutations();

//     const {
//       id: commentId,
//       CreatedBy,
//       createdAt,
//     } = object || {}

//     const inEditMode = this.isInEditMode();

//     if (!commentId) {

//       return <Typography
//         variant="subheading"
//         className={classes.addCommentTitle}
//       >
//         Добавить комментарий
//     </Typography>;
//     }

//     return <div
//       className={classes.header}
//     >
//       <Grid
//         container
//         spacing={16}
//       >

//         {CreatedBy
//           ?
//           <Grid
//             item
//           >

//             <UserLink
//               user={CreatedBy}
//               showName={false}
//             // avatarProps={{
//             //   size: "medium",
//             // }}
//             />
//           </Grid>
//           : null
//         }

//         <Grid
//           item
//           xs
//         >

//           <Grid
//             container
//           >

//             <Grid
//               item
//               xs
//             >
//               {CreatedBy
//                 ?
//                 <UserLink
//                   user={CreatedBy}
//                   withAvatar={false}
//                 />
//                 :
//                 null
//               }

//             </Grid>

//             <Grid
//               item
//             >

//               {/* {createdAt ? <Typography
//                 variant="caption"
//                 color="textSecondary"
//               >
//                 {moment(createdAt).format('lll')}
//               </Typography> : null} */}

//               {createdAt ? <CommentLink
//                 object={object}
//               /> : null}

//             </Grid>

//           </Grid>

//         </Grid>

//       </Grid>
//     </div>

//   }

//   renderDefaultView() {

//     const {
//       classes,
//     } = this.props;

//     const comment = this.getObjectWithMutations();

//     if (!comment) {
//       return null;
//     }

//     const {
//       text,
//     } = comment;

//     const inEditMode = this.isInEditMode();
//     const allow_edit = this.canEdit();

//     const editor = <Editor
//       // className="topic-editor"
//       content={text}
//       inEditMode={inEditMode || false}
//       fullView={true}
//       allow_edit={allow_edit}
//       onChange={(state, rawContent) => {

//         this.updateObject({
//           text: rawContent,
//         });

//       }}
//     />;

//     return <Grid
//       container
//     >

//       <Grid
//         item
//         xs
//       >
//         {editor}
//       </Grid>

//       <Grid
//         item
//       >

//         {this.getButtons()}

//       </Grid>

//     </Grid>;
//   }

//   renderEditableView() {

//     return this.renderDefaultView();

//     return <Grid
//       container
//     >

//       <Grid
//         item
//         xs
//       >
//         {this.renderDefaultView()}
//       </Grid>

//       <Grid
//         item
//       >

//         {this.getButtons()}

//       </Grid>

//     </Grid>

//   }

//   renderResetButton() {

//     const {
//       id,
//     } = this.getObjectWithMutations() || {}

//     return id ? super.renderResetButton() : null;
//   }

//   render() {

//     const object = this.getObjectWithMutations();

//     if (!object) {
//       return null;
//     }

//     const {
//       classes,
//     } = this.props;

//     return <div
//       className={classes.root}
//     >

//       {super.render()}

//     </div>

//   }
// }

// export default withStyles(styles)(props => <CommentView {...props}/>);
