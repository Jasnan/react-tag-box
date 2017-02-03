import { PropTypes } from 'react'
import debounce from 'debounce-promise'
import makeCache from './cache'
import TagContainer from './TagBoxContainer'

export default class TagBoxAsync extends TagContainer {
  static propTypes = {
    fetch: PropTypes.func.isRequired
  }

  state = {
    tags: [],
    tag: '',
    considering: null,
    loading: false
  }

  cache = makeCache()

  loader() {
    return debounce(this.props.fetch, 500)
  }

  tags() {
    return this.state.tags
  }

  loading() {
    return this.state.loading
  }

  tagUpdater() {
    return e => {
      const input = e.target.value
      this.setState({ tag: input })

      const matches = this.cache.get(input)
      if (matches) {
        return this.setState({ tags: matches })
      }

      this.setState({ loading: true })
      const fetch = this.loader()
      return fetch(input).then(tags => {
        this.setState({
          tags: this.cache.add(input, tags),
          loading: false
        })
      })
    }
  }
}
