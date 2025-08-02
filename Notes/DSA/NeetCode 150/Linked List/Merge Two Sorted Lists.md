Link: https://leetcode.com/problems/merge-two-sorted-lists/description/

**My solution**

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        if (list1 == nullptr) {
            return list2;
        }

        if (list2 == nullptr) {
            if (list1 != nullptr) {
                return list1;
            }

            return nullptr;
        }

        vector<int> mergedList;

        while (list1 != nullptr) {
            mergedList.push_back(list1->val);

            list1 = list1->next;
        }

        while (list2 != nullptr) {
            mergedList.push_back(list2->val);

            list2 = list2->next;
        }

        sort(mergedList.begin(), mergedList.end());

        ListNode* iterator = new ListNode();
        ListNode* mergedLinkedList = iterator;
        ListNode* previous = iterator;
        
        iterator->val = mergedList[0];

        for (int i = 1; i < mergedList.size(); ++i) {
            iterator = new ListNode();

            iterator->val = mergedList[i];

            previous->next = iterator;
            previous = previous->next;
        }

        return mergedLinkedList;
    }
};
```

**Time complexity:** O(m + n log(m + n)), where m is the size of the list1, and n is the size of the list2

**Space complexity:** O(m + n)

This is **not** the optimized solution.

**Optimized solution**

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy;
        ListNode* tail = &dummy;

        while (list1 && list2) {
            if (list1->val < list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }

            tail = tail->next;
        }

        if (list1) {
            tail->next = list1;
        } else {
            tail->next = list2;
        }

        return dummy.next;
    }
};
```

**Time complexity:** O(m + n), where m is the size of the list1, and n is the size of the list2

**Space complexity:** O(1)