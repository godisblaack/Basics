Link: https://leetcode.com/problems/reverse-nodes-in-k-group/description/

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
    ListNode* reverseKGroup(ListNode* head, int k) {
        vector<int> list;

        while (head != nullptr) {
            list.push_back(head->val);

            head = head->next;
        }

        int left = 0;
        int right = 0;

        while (right < list.size()) {
            while (right - left + 1 < k) {
                right++;

                if (right == list.size()) {
                    break;
                }
            }

            if (right == list.size()) {
                break;
            }

            reverse(list.begin() + left, list.begin() + right + 1);

            if (right < list.size()) {
                left = right + 1;
            }
        }


        ListNode* dummy = new ListNode(0);
        head = dummy;

        for (int num : list) {
            ListNode* temp = new ListNode(num);

            dummy->next = temp;
            dummy = temp;
        }

        return head->next;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

**Optimal solution**

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
    ListNode* reverseKGroup(ListNode* head, int k) {
        if (!head || k == 1) return head;

        ListNode dummy(0);
        dummy.next = head;
        ListNode* prevGroupEnd = &dummy;

        while (true) {
            ListNode* kth = prevGroupEnd;
            for (int i = 0; i < k && kth; ++i) {
                kth = kth->next;
            }
            if (!kth) break;

            ListNode* groupStart = prevGroupEnd->next;
            ListNode* nextGroupStart = kth->next;

            // Reverse the group
            ListNode* prev = nextGroupStart;
            ListNode* curr = groupStart;
            while (curr != nextGroupStart) {
                ListNode* temp = curr->next;
                curr->next = prev;
                prev = curr;
                curr = temp;
            }

            prevGroupEnd->next = kth;
            prevGroupEnd = groupStart;
        }

        return dummy.next;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)