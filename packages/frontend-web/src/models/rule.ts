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

import { Record } from 'immutable';
import { TypedRecord } from 'typed-immutable-record';

export const RULE_ACTION_ACCEPT = 'Accept';
export const RULE_ACTION_REJECT = 'Reject';
export const RULE_ACTION_DEFER = 'Defer';
export const RULE_ACTION_HIGHLIGHT = 'Highlight';

export type IRuleAction = 'Accept' | 'Reject' | 'Defer' | 'Highlight';

export interface IRuleAttributes {
  id: string;
  action: IRuleAction | null;
  categoryId: string | null;
  createdBy: string | null;
  lowerThreshold: number;
  upperThreshold: number;
  tagId: string | null;
}

export interface IRuleModel extends TypedRecord<IRuleModel>, IRuleAttributes {}

const RuleModelRecord = Record({
  id: null,
  action: null,
  categoryId: null,
  createdBy: null,
  lowerThreshold: null,
  upperThreshold: null,
  tagId: null,
});

export function RuleModel(keyValuePairs?: IRuleAttributes): IRuleModel {
  return new RuleModelRecord(keyValuePairs) as IRuleModel;
}
