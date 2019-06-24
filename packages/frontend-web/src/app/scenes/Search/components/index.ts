/*
Copyright 2019 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { ICommentAction } from '../../../../types';
import { IAppDispatch, IAppStateRecord } from '../../../stores';
import {
  approveComments,
  deferComments,
  highlightComments,
  rejectComments,
  resetComments,
  tagCommentSummaryScores,
} from '../../../stores/commentActions';
import {
  approveComment,
  deferComment,
  highlightComment,
  rejectComment,
  resetComment,
} from '../../../stores/comments';
import { getTaggableTags } from '../../../stores/tags';
import { getTextSizes } from '../../../stores/textSizes';
import {
  getAllCommentIds,
  getAreAllSelected,
  getAreAnyCommentsSelected,
  getCommentListIsLoading,
  getCurrentPagingIdentifier,
  getIsItemChecked,
  getSelectedCount,
  toggleSelectAll,
  toggleSingleItem,
} from '../store';
import { ISearchResultsProps, SearchResults as PureSearchResults } from './SearchResults';

const updateCommentStateAction: {
  [key: string]: any;
} = {
  highlight: highlightComment,
  approve: approveComment,
  defer: deferComment,
  reject: rejectComment,
  reset: resetComment,
};

export interface IActionMap {
  [key: string]: (ids: Array<string>, tagId?: string) => () => Promise<void>;
}

const actionMap: IActionMap = {
  highlight: highlightComments,
  approve: approveComments,
  defer: deferComments,
  reject: rejectComments,
  tag: tagCommentSummaryScores,
  reset: resetComments,
};

const mapStateToProps = createStructuredSelector({
  totalCommentCount: (state: IAppStateRecord) => getAllCommentIds(state).size,
  isLoading: getCommentListIsLoading,
  isItemChecked: (state: IAppStateRecord) => (id: string) => getIsItemChecked(state, id),
  areNoneSelected: getAreAnyCommentsSelected,
  areAllSelected: getAreAllSelected,
  selectedCount: getSelectedCount,
  allCommentIds: getAllCommentIds,
  tags: getTaggableTags,
  textSizes: getTextSizes,
  pagingIdentifier: getCurrentPagingIdentifier,
});

function mapDispatchToProps(dispatch: IAppDispatch): Partial<ISearchResultsProps> {
  return {
    tagComments: (ids: Array<string>, tagId: string) =>
      dispatch(tagCommentSummaryScores(ids, tagId)),

    dispatchAction: (action: ICommentAction, idsToDispatch: Array<string>) =>
      dispatch(actionMap[action](idsToDispatch)),

    onToggleSelectAll: () => (
      dispatch(toggleSelectAll())
    ),

    onToggleSingleItem: (item: { id: string }) => (
      dispatch(toggleSingleItem(item))
    ),

    updateCommentState: (action: ICommentAction, ids: Array<string>) =>
      dispatch(updateCommentStateAction[action](ids)),
  };
}

export type ISearchResultPublicProps = Pick<ISearchResultsProps, 'searchTerm' | 'searchByAuthor'>;

export const SearchResults: React.ComponentClass<ISearchResultPublicProps> = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PureSearchResults);