export function mapState(state) {
  return {
    player: state.setPlayer,
    singerInfo: state.singerInfo,
    rankInfo: state.rankInfo,
    searchHistory: state.searchHistory
  }
}