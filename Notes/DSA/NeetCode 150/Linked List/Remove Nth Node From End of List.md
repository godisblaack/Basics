Link: https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/

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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        if (head->next == nullptr) {
            if (n == 1) {
                head = nullptr;
                
                return head;
            }
        }

        ListNode* left = head;
        ListNode* right = head;

        int i;
        
        for (i = 0; right->next != nullptr; i++) {
            if (i >= n) {
                left = left->next;
            }

            right = right->next;
        }

        if (i < n) {
            head = head->next;

            return head;
        }

        left->next = left->next->next;

        return head;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

This is the **optimized** solution.

**Cleaner solution**

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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* first = dummy;
        ListNode* second = dummy;

        // Move first pointer n+1 steps ahead
        for (int i = 0; i <= n; ++i) {
            first = first->next;
        }

        // Move first to the end, second will be at node before target
        while (first != nullptr) {
            first = first->next;
            second = second->next;
        }

        second->next = second->next->next;

        return dummy->next;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)