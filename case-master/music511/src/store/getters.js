export const getPlaySrc = (state) => {
	//获取当前播放地址
	return state.playSrc;
}
export const getCurSong = (state)=>{
	//获取当前歌曲信息
	return state.curSong;
}
export const getPlayState = (state)=>{
	//获取当前的播放状态
	return state.playState;
}
export const getPlayList = (state)=>{
	//获取歌曲列表
	return state.playList;
}
export const getCurSongIndex = (state)=>{
	//获取当前歌曲的索引
	return state.curSongIndex;
}