Link: https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/description/

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
    ListNode* deleteMiddle(ListNode* head) {
        int middleElementPosition = length(head);

        if (middleElementPosition == 1) {
            return nullptr;
        }

        ListNode* deleteNode = head;
        ListNode* previous = head;

        for (int i = 0; i < middleElementPosition / 2; i++) {
            deleteNode = deleteNode->next;

            if (i < (middleElementPosition / 2) - 1) {
                previous = previous->next;
            }
        }

        previous->next = deleteNode->next;

        return head;
    }
    
    int length(ListNode* head) {
        ListNode* temp = head;

        int count = 0;

        while (temp) {
            count++;

            temp = temp->next;
        }

        return count;
    }
};
```

**Time complexity:** O(N + N) = O(N)

**Space complexity:** O(1)

This code is **not** the optimized solution.

**Optimized solution by Gemini**

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 * int val;
 * ListNode *next;
 * ListNode() : val(0), next(nullptr) {}
 * ListNode(int x) : val(x), next(nullptr) {}
 * ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* deleteMiddle(ListNode* head) {
        // Handle edge cases: 0 or 1 node
        if (head == nullptr || head->next == nullptr) {
            return nullptr; // If 0 or 1 node, deleting the middle means an empty list
        }

        ListNode* slow = head;
        ListNode* fast = head;
        ListNode* prev = nullptr; // To keep track of the node before 'slow'

        while (fast != nullptr && fast->next != nullptr) {
            prev = slow;       // 'prev' is always one step behind 'slow'
            slow = slow->next; // 'slow' moves one step
            fast = fast->next->next; // 'fast' moves two steps
        }

        // At this point:
        // 'slow' is at the middle node to be deleted.
        // 'prev' is at the node just before 'slow'.

        // Delete the middle node by skipping it
        prev->next = slow->next;

        return head;
    }
};
```

**Time complexity:** O(N + N) = O(N)

**Space complexity:** O(1)