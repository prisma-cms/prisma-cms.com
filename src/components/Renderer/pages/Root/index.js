import React from 'react'

import PrismaCmsComponent from '@prisma-cms/component'
import RootConnector from '@prisma-cms/front-editor/lib/components/Root'
import UserPage from './components/pages/Users/User'
import OldPageHeader from './components/OldPageHeader'
import OldPages from './components/pages/OldPages'
// import SwitchTemplateLink from './components/Link/SwitchTemplate';
// import PdfView from './components/PdfView';
import CreateUserPage from './components/pages/Users/User/Create'
import Topic from './components/Resource/Topic'
import Resource from './components/Resource'
import ResourceFields from './components/Resource/Fields'
import ResourceContent, {
  RichTextCustom,
} from './components/Resource/Fields/Field/ResourceContent'
import Comments from './components/Resource/Comments'
import TopicBlog from './components/Resource/Topic/TopicBlog'
import Youtube from './components/Resource/Fields/Field/Youtube'
import ChatRooms from './components/pages/ChatRooms'
import ChatRoom from './components/pages/ChatRooms/ChatRoom'
import JoinUserTechnologyButton from './components/JoinUserTechnologyButton'
import ViewIcon from './components/ViewIcon'
import TopicsPage from './components/pages/TopicsPage'
import AcceptTechnologyLesson from './components/society/technologies/AcceptTechnologyLesson'
import TechnologyLessonUser from './components/society/technologies/TechnologyLessonUser'
import FreeCodeCamp from './components/FreeCodeCamp/FreeCodeCamp'
import CodeChallenge from './components/FreeCodeCamp/CodeChallenge'
import CallRequestButtons from './components/webrtc/CallRequestButtons'

export const CustomComponents = [
  UserPage,
  OldPageHeader,
  OldPages,
  // SwitchTemplateLink,
  CreateUserPage,
  TopicsPage,
  // PdfView,
  Topic,
  Comments,
  TopicBlog,
  Resource,
  ResourceFields,
  ResourceContent,
  RichTextCustom,
  Youtube,
  ChatRooms,
  ChatRoom,
  JoinUserTechnologyButton,
  ViewIcon,
  AcceptTechnologyLesson,
  TechnologyLessonUser,
  FreeCodeCamp,
  CodeChallenge,
  CallRequestButtons,
]

export class RootPage extends PrismaCmsComponent {
  render() {
    const { ...other } = this.props

    return <RootConnector CustomComponents={CustomComponents} {...other} />
  }
}

export default RootPage
