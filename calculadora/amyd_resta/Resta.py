
def restar(* nums):
    total = nums[0]
    for num in nums[1:]:
        total -= num
    return total
