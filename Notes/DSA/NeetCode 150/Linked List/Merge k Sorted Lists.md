List: https://leetcode.com/problems/merge-k-sorted-lists/description/

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
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if (lists.size() == 0) {
            return nullptr;
        }

        vector<int> mergedList;

        for (ListNode* temp : lists) {
            if (temp == nullptr) {
                continue;
            }

            while (temp != nullptr) {
                mergedList.push_back(temp->val);

                temp = temp->next;
            }
        }

        if (mergedList.size() == 0) {
            return nullptr;
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

**Time complexity:** O(N log N) 

**Space complexity:** O(N)

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
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };

        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);

        // Push initial heads into heap
        for (ListNode* node : lists) {
            if (node)
                pq.push(node);
        }

        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (!pq.empty()) {
            ListNode* node = pq.top();
            pq.pop();

            tail->next = node;
            tail = tail->next;

            if (node->next)
                pq.push(node->next);
        }

        return dummy.next;
    }
};
```

**Time complexity:** O(N log k), where N is the total number of nodes, k is the number of lists.

**Space complexity:** O(k), for the heap storing at most k nodes.