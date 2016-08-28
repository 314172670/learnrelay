import * as React from 'react'
import {Link} from 'react-router'
import Icon from '../Icon/Icon'
import ServerLayover from '../ServerLayover/ServerLayover'
import {chapters} from '../../utils/content'

require('./style.css')

interface Props {
  children: React.ReactElement<any>
  params: any
}

interface State {
  showLayover: boolean
  endpoint: string
}

export default class App extends React.Component<Props, State> {

  state = {
    showLayover: true,
    endpoint: 'https://api.graph.cool/relay/v1/cis4fgtjc0edy0143nj3dfuj9',
  }

  render() {
    return (
      <div className='flex'>
        <div className='w-20 pa4 flex flex-column vertical-line min-width-240'>
          <h2 className='fw3 pb4'>
            <span className='dib mr3 mrl-1'><Icon
              src={require('../../assets/icons/logo.svg')}
              width={22}
              height={13}
            /></span>
            Learn Relay
          </h2>
          {chapters.map((chapter, index) => (
            <div className='flex flex-column'>
              <span className='fw6 pb3 black'>
                <span className='mr3 o-20 bold'>{index + 1}</span> {chapter.title}
              </span>
              {chapter.subchapters.map((subchapter) => (
                <Link className='pb3 fw3 black' to={`/${chapter.alias}/${subchapter.alias}`}>
                  <span className='mr3 fw5 o-20 bold'>✓</span> {subchapter.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className='w-80'>
          {this.props.children}
        </div>
        {this.state.showLayover &&
        <ServerLayover
          endpoint={this.state.endpoint}
          close={() => this.setState({ showLayover: false } as State)}
        />
        }
      </div>
    )
  }
}
