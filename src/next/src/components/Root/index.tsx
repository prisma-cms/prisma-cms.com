import React from 'react'

import FrontEditor, { FrontEditorProps } from '@prisma-cms/front-editor'
// // import OldPageHeader from './components/OldPageHeader'
// // import OldPages from './components/pages/OldPages'
// // import SwitchTemplateLink from './components/Link/SwitchTemplate';
// // import PdfView from './components/PdfView';
// import Topic from './components/Resource/Topic'
import Resource from './components/Resource'
import ResourceFields from './components/Resource/Fields'
import ResourceContent, {
  RichTextCustom,
} from './components/Resource/Fields/Field/ResourceContent'
// import Comments from './components/Resource/Comments'
// import TopicBlog from './components/Resource/Topic/TopicBlog'
import Youtube from './components/Resource/Fields/Field/Youtube'
// import JoinUserTechnologyButton from './components/JoinUserTechnologyButton'
// import ViewIcon from './components/ViewIcon'
// import AcceptTechnologyLesson from './components/society/technologies/AcceptTechnologyLesson'
// import TechnologyLessonUser from './components/society/technologies/TechnologyLessonUser'
// // import FreeCodeCamp from './components/FreeCodeCamp/FreeCodeCamp'
// // import CodeChallenge from './components/FreeCodeCamp/CodeChallenge'
// import CallRequestButtons from './components/webrtc/CallRequestButtons'

export const CustomComponents = [
  // UserPage,
  // OldPageHeader,
  // OldPages,
  // SwitchTemplateLink,
  // CreateUserPage,
  // TopicsPage,
  // PdfView,
  // Topic,
  // Comments,
  // TopicBlog,
  Resource,
  ResourceFields,
  ResourceContent,
  RichTextCustom,
  Youtube,
  // ChatRooms,
  // ChatRoom,
  // JoinUserTechnologyButton,
  // ViewIcon,
  // AcceptTechnologyLesson,
  // TechnologyLessonUser,
  // FreeCodeCamp,
  // CodeChallenge,
  // CallRequestButtons,
] as FrontEditorProps['Components']

const RootPage: React.FC<FrontEditorProps> = (props) => {
  return <FrontEditor {...props} CustomComponents={CustomComponents} />
}

export default RootPage
