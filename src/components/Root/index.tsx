import React from 'react'

import FrontEditor, { FrontEditorProps } from '@prisma-cms/front-editor'
import FrontEditorComponents from '@prisma-cms/front-editor/dist/preset/all'

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

type RootPageProps = Omit<FrontEditorProps, 'Components'>

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

const Components = CustomComponents.reduce((curr, next) => {
  const index = curr.findIndex((n) => n.Name === next.Name)

  if (index !== -1) {
    curr[index] = next
  } else {
    curr.push(next)
  }

  return curr
}, FrontEditorComponents)

const RootPage: React.FC<RootPageProps> = (props) => {
  return <FrontEditor Components={Components} {...props} />
}

export default RootPage
