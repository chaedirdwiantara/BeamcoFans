export interface DataCountryType {
  value: string;
  label: string;
  image: string;
  code: string;
}
export const countryData: DataCountryType[] = [
  {
    value: '1',
    label: 'HK',
    image: require('../assets/flags/HK.png'),
    code: '+852',
  },
  {
    value: '2',
    label: 'MO',
    image: require('../assets/flags/MO.png'),
    code: '+853',
  },
  {
    value: '3',
    label: 'TW',
    image: require('../assets/flags/TW.png'),
    code: '+886',
  },
];

export interface DataDropDownType {
  label: string;
  value: string;
  disabled?: boolean;
}

export const dropDownDataCategory: DataDropDownType[] = [
  {label: 'Home.Tab.TopPost.Category.All', value: ''},
  {label: 'Home.Tab.TopPost.Category.ComingUp', value: 'coming_up'},
  {label: 'Home.Tab.TopPost.Category.Tour', value: 'otr'},
  {label: 'Home.Tab.TopPost.Category.DailyLife', value: 'day_in_life'},
  {
    label: 'Home.Tab.TopPost.Category.BTS',
    value: 'behind_the_scene',
  },
  {label: 'Home.Tab.TopPost.Category.Highlight', value: 'highlight'},
  {label: 'Home.Tab.TopPost.Category.Backstage', value: 'backstage'},
];

export interface DropDownFilterType {
  label: string;
  value: string;
}

export const dropDownDataFilter: DropDownFilterType[] = [
  {label: 'Home.Tab.TopPost.Filter.Today', value: '1'},
  {label: 'Home.Tab.TopPost.Filter.LastWeek', value: '7'},
  {label: 'Home.Tab.TopPost.Filter.ThisMonth', value: '30'},
];

export interface DropDownSortType {
  label: string;
  value: string;
}

export const dropDownDataSort: DropDownSortType[] = [
  {label: 'Feed.Sort.Latest', value: '1'},
  {label: 'Feed.Sort.Popular', value: '2'},
];

export const dropDownDataFilterBy: DropDownSortType[] = [
  {label: 'Feed.FilterBy.All', value: 'all'},
  {label: 'Feed.FilterBy.Exclusive', value: 'exclusive'},
  {label: 'Feed.FilterBy.Public', value: 'public'},
];

export const dropDownDataSubscription: DataDropDownType[] = [
  {label: 'Setting.Tips.Filter.All', value: ''},
  {label: 'Setting.Tips.Filter.Weekly', value: 'weekly'},
  {label: 'Setting.Tips.Filter.Monthly', value: 'monthly'},
  {label: 'Setting.Tips.Filter.Yearly', value: 'yearly'},
];

export const dropDownDataDonation: DataDropDownType[] = [
  {label: 'Setting.Tips.Filter.All', value: ''},
  {label: 'Setting.Tips.Filter.OneTime', value: 'onetime'},
  {label: 'Setting.Tips.Filter.Daily', value: 'daily'},
  {label: 'Setting.Tips.Filter.Weekly', value: 'weekly'},
  {label: 'Setting.Tips.Filter.Monthly', value: 'monthly'},
  {label: 'Setting.Tips.Filter.Yearly', value: 'yearly'},
];

export const dropDownHeaderAlbum: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Queue', value: '1', disabled: false},
  {label: 'General.Share.Album', value: '2', disabled: false},
  // {label: 'Music.Label.AddToMyPlaylist', value: '3', disabled: false},
];

export const albumReport: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Queue', value: '1', disabled: false},
  {label: 'General.Share.Album', value: '2', disabled: false},
  // {label: 'Music.Label.AddToMyPlaylist', value: '3', disabled: false},
  {label: 'Post.Dropdown.Report', value: '22', disabled: false},
];

export const albumReportSent: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Queue', value: '1', disabled: false},
  {label: 'General.Share.Album', value: '2', disabled: false},
  // {label: 'Music.Label.AddToMyPlaylist', value: '3', disabled: false},
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
];

export const dropDownHeaderSongDetails: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Playlist', value: '1'},
  {label: 'Home.Tab.TopSong.Queue', value: '2'},
  {label: 'Home.Tab.TopSong.Share', value: '3'},
  {label: 'Home.Tab.TopSong.Credits', value: '4'},
];

export const dropDownSubscription: DataDropDownType[] = [
  {label: 'Setting.Tips.Menu.Subs.GoToMusician', value: '1'},
  {label: 'Setting.Tips.Menu.Subs.Unsubs', value: '2'},
];

export const dropDownTipping: DataDropDownType[] = [
  {label: 'Setting.Tips.Menu.Subs.GoToMusician', value: '1'},
  {label: 'Setting.Tips.Menu.Donation.Stop', value: '2'},
];

export const dataUpdateComment: DataDropDownType[] = [
  {label: 'Post.Label.EditReply', value: '1'},
  {label: 'Post.Label.DeleteReply', value: '2'},
];

export const dataUpdatePost: DataDropDownType[] = [
  {label: 'Post.Label.EditPost', value: '1'},
  {label: 'Post.Label.DeletePost', value: '2'},
];

export const dropDownActionCategory: DataDropDownType[] = [
  {label: 'Event.Dropdown.Category.Fashion', value: '1'},
  {label: 'Event.Dropdown.Category.Collection', value: '2'},
];

export const dropDownActionSort: DataDropDownType[] = [
  {label: 'Event.Dropdown.Sort.HighestPrice', value: '1'},
  {label: 'Event.Dropdown.Sort.LowestPrice', value: '2'},
  {label: 'Event.Dropdown.Sort.MostSold', value: '3'},
];

export const dataReportPost: DataDropDownType[] = [
  {label: 'Post.Dropdown.Visit', value: '11', disabled: false},
  {label: 'Post.Dropdown.Report', value: '22', disabled: false},
  {label: 'Post.Dropdown.Block', value: '33'},
];

export const dataAlreadyReportPost: DataDropDownType[] = [
  {label: 'Post.Dropdown.Visit', value: '11', disabled: false},
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
  {label: 'Post.Dropdown.Block', value: '33', disabled: false},
];

export const dataReportPostProfile: DataDropDownType[] = [
  {label: 'Post.Dropdown.Report', value: '22', disabled: false},
];

export const dataReportAlreadyPostProfile: DataDropDownType[] = [
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
];

export const dataListSongAlbum: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Playlist', value: '1', disabled: false},
  {label: 'Home.Tab.TopSong.Tip', value: '2', disabled: false},
  {label: 'Home.Tab.TopSong.Queue', value: '3', disabled: false},
  {label: 'Home.Tab.TopSong.Share', value: '4', disabled: false},
  {label: 'Home.Tab.TopSong.Details', value: '5', disabled: false},
  {label: 'Post.Dropdown.Report', value: '22', disabled: false},
];

export const dataListSongAlbumReportSent: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Playlist', value: '1', disabled: false},
  {label: 'Home.Tab.TopSong.Tip', value: '2', disabled: false},
  {label: 'Home.Tab.TopSong.Queue', value: '3', disabled: false},
  {label: 'Home.Tab.TopSong.Share', value: '4', disabled: false},
  {label: 'Home.Tab.TopSong.Details', value: '5', disabled: false},
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
];

export const dropDownTransactionCategory: DataDropDownType[] = [
  {label: 'Transaction.Dropdown.Category.All', value: '1'},
  {label: 'Transaction.Dropdown.Category.Merchandise', value: '2'},
  {label: 'Transaction.Dropdown.Category.Ticket', value: '2'},
];

export const dropDownTransactionSort: DataDropDownType[] = [
  {label: 'Transaction.Dropdown.Sort.Newest', value: '1'},
  {label: 'Transaction.Dropdown.Sort.Oldest', value: '2'},
];

export const dataProfileDropdown: DataDropDownType[] = [
  {label: 'Dropdown.Profile.qr', value: '1', disabled: false},
  {label: 'Dropdown.Profile.block', value: '3', disabled: false},
];

export const dataProfileDropdownBlocked: DataDropDownType[] = [
  {label: 'Dropdown.Profile.qr', value: '1', disabled: false},
  {label: 'Dropdown.Profile.unblock', value: '4', disabled: false},
];

export const dataMyProfileDropDown: DataDropDownType[] = [
  {label: 'Dropdown.Profile.qr', value: '1', disabled: false},
  {label: 'Dropdown.Profile.setting', value: '5', disabled: false},
];
