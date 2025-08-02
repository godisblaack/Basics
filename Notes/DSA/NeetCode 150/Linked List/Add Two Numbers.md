Link: https://leetcode.com/problems/add-two-numbers/description/

I was not able to solve it. I wrote brute force solution and didn't pass all the test cases.

**Brute force** 

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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        string num1;

        while (l1) {
            num1 += to_string(l1->val);

            l1 = l1->next;
        }

        reverse(num1.begin(), num1.end());

        string num2;

        while (l2) {
            num2 += to_string(l2->val);

            l2 = l2->next;
        }

        reverse(num2.begin(), num2.end());

        long long sum = stoll(num1) + stoll(num2);

        ListNode* dummy = new ListNode(0);
        ListNode* head = dummy;

        while (sum) {
            int digit = sum % 10;

            sum /= 10;

            ListNode* temp = new ListNode(digit);

            dummy->next = temp;
            dummy = dummy->next;
        }

        if (head->next == nullptr) {
            return new ListNode(0);
        }

        return head->next;
    }
};
```

**Time complexity:** O(n + m + d), where n is the length of l1, m is the length of l2, and d is the number of digits in the result. 

**Space complexity:** O(n + m + d)

**Better solution** 

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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        int carry = 0;

        while (l1 || l2 || carry) {
            int sum = carry;
            if (l1) {
                sum += l1->val;
                l1 = l1->next;
            }
            if (l2) {
                sum += l2->val;
                l2 = l2->next;
            }

            carry = sum / 10;
            curr->next = new ListNode(sum % 10);
            curr = curr->next;
        }

        return dummy->next;
    }
};
```

**Time complexity:** O(max(n, m)), where n is the length of l1, and m is the length of l2.

**Space complexity:** O(max(n, m))

**Optimized solution**

```cpp
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode* head = l1;
    ListNode* prev = nullptr;
    int carry = 0;

    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) {
            sum += l1->val;
        }
        if (l2) {
            sum += l2->val;
        }

        if (l1) {
            l1->val = sum % 10;
            carry = sum / 10;
            prev = l1;
            l1 = l1->next;
        } else {
            prev->next = new ListNode(sum % 10);
            carry = sum / 10;
            prev = prev->next;
        }

        if (l2) l2 = l2->next;
    }

    return head;
}
```

**Time complexity:** O(max(n, m)), where n is the length of l1, and m is the length of l2.

**Space complexity:** O(1)