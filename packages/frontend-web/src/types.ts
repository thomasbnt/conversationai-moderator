/*
Copyright 2017 Google Inc.

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

export interface IRedialLocals {
  path: string;
  getState(): any;
  query: {
    [key: string]: string;
  };
  params: {
    [key: string]: string;
  };
  dispatch(payload: any): any;
}

export type IConfirmationAction = 'approve' | 'defer' | 'highlight' | 'reject'| 'tag' | 'reset';

export type ICommentAction = 'highlight' | 'approve' | 'defer' | 'reject' | 'tag';

export type IModerationAction = 'approve' | 'defer' | 'highlight' | 'reject';

export interface ITopScore {
  start: number;
  end: number;
}
