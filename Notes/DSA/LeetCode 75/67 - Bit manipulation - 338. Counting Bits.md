Link: https://leetcode.com/problems/counting-bits/description/

**My solution**

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> bits;

        for (int i = 0; i <= n; i++) {
            int temp = i;

            int count = 0;

            while (temp != 0) {
                if (temp & 1 == 1) {
                    count++;
                }

                temp >>= 1;
            }

            bits.push_back(count);
        }

        return bits;
    }
};
```

**Time complexities:** O(N log N)

**Space complexities:** O(N)

Let's analyze the time complexity of your `countBits` solution.

The outer `for` loop runs from `i = 0` to `n`, which is $n+1$ iterations.

Inside the outer loop, for each value of `i`, you have a `while` loop that runs as long as `temp` (which is initially `i`) is not zero. In the worst case, if `i` is close to $n$, the number of iterations of the inner `while` loop is proportional to the number of bits in `n`. If $n$ is an integer, the number of bits is roughly $\log_2(n)$.

So, for each of the $n+1$ values of `i`, the inner loop takes approximately $O(\log i)$ time in the worst case.

Therefore, the total time complexity would be roughly the sum of $\log i$ for $i$ from 0 to $n$. A loose upper bound for this would be $O(n \log n)$.

Let's be a bit more precise about the inner loop. The number of iterations of the inner `while` loop is equal to the number of bits in `i`. The maximum number of bits for an integer up to $n$ is $\lfloor \log_2(n) \rfloor + 1$.

So, for each number from 0 to $n$, we are doing work proportional to the number of bits in that number. In the worst case (when $i=n$), this is $O(\log n)$. Since we do this for $n+1$ numbers, a naive upper bound is $O(n \log n)$.

However, we can think about how many times each bit position is checked across all numbers from 0 to $n$.

Consider the $k$-th bit (from the right, starting at 0). This bit flips every $2^k$ numbers. Up to $n$, it will flip approximately $n / 2^k$ times. For each flip, we do a constant amount of work.

The total work would be roughly the sum over all bit positions $k$ (from 0 up to $\log n$) of $(n/2^k) \times (\text{constant work})$.

$$\sum_{k=0}^{\log n} \frac{n}{2^k} \approx n \sum_{k=0}^{\infty} (\frac{1}{2})^k = n \times \frac{1}{1 - 1/2} = 2n$$

This suggests that the overall time complexity is actually $O(n)$.

**More direct reasoning:**

The outer loop runs $n+1$ times. The inner loop runs for a number of iterations equal to the number of bits in `i`. The sum of the number of set bits for all numbers from 0 to $n$ is related to $n \log n$, but when we consider the work done in the inner loop for each `i`, it's bounded by the number of bits in $n$.

Let's re-evaluate. For each `i` from 0 to $n$, the inner `while` loop iterates at most $\log_2(i) + 1$ times. The total number of operations is roughly:

$$\sum_{i=0}^{n} \log_2(i+1)$$

This sum is indeed in the order of $O(n \log n)$.

**Therefore, the time complexity of your solution is O(n log n).**

**Space Complexity:**

You are creating a `vector<int> bits` of size $n+1$ to store the counts. Therefore, the space complexity is **O(n)**.

**Is there a more optimized solution?**

Yes, there is a dynamic programming approach that can solve this in $O(n)$ time. The idea is to use the counts of set bits for smaller numbers to calculate the count for the current number.

For any number `x`, the number of set bits in `x` is equal to the number of set bits in `x / 2` plus the value of the last bit of `x` (`x % 2` or `x & 1`).

Here's how that would look:

```cpp
class Solution {
public:
    std::vector<int> countBits(int n) {
        std::vector<int> bits(n + 1);
        bits[0] = 0;
        for (int i = 1; i <= n; ++i) {
            bits[i] = bits[i >> 1] + (i & 1);
        }
        return bits;
    }
};
```

**Time complexities:** O(N)

**Space complexities:** O(N)

This dynamic programming solution has a time complexity of O(n) because the loop runs from 1 to $n$, and each operation inside the loop takes constant time. The space complexity is O(n) to store the `bits` vector.

**Time Complexity Analysis:**

1.  You initialize a vector `bits` of size $n+1$. This takes $O(n)$ time in some implementations, but we'll focus on the main loop.
2.  The `for` loop iterates from `i = 1` to `n`. This loop runs $n$ times.
3.  Inside the loop, the operations `bits[i >> 1]` (right shift and access), `(i & 1)` (bitwise AND), and the addition are all constant-time operations, $O(1)$.

Since the loop runs $n$ times and each operation inside takes constant time, the overall **time complexity of this optimized solution is O(n)**.

**Space Complexity Analysis:**

1.  You create a `std::vector<int> bits(n + 1)`. This vector stores $n+1$ integer values.

Therefore, the **space complexity of this optimized solution is O(n)** because the amount of extra space used scales linearly with the input `n`. We need to store the result for each number from 0 to $n$.

**In summary for the optimized solution:**

* **Time Complexity: O(n)**
* **Space Complexity: O(n)**

This is an improvement in time complexity compared to your initial $O(n \log n)$ solution, while the space complexity remains $O(n)$ (as we need to store the results).

Do you have any other questions about this solution?