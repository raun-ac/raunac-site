
---
title :  "SIMD AVX-512 Memory Wall Benchmark"
description :  "C++ • SIMD Intrinsics • Systems Programming"
date : "Aug 19 2026"
repoURL : "https://github.com/raun-ac/simd-euclidean-benchmark"

---

#### Abstract

This project measures and shows the decrease in performance of an AVX-512 vectorized mathematical function as data size exceeds the CPU cache limits, demonstrating the Von Neumann bottleneck. By profiling hardware execution, this benchmark proves that how achieving computational optimization becomes limited by memory bottleneck as processor compute data much faster than memory can move it.


#### The Theory: Compute vs. Memory Bandwidth

Calculating the Euclidean distance between two vectors is a simple mathematical operation :


$$
d(p,q) = \sqrt{\sum_{i=1}^{n}(p_i-q_i)^2}
$$

In standard scalar execution, a CPU processes exactly one pair of coordinates in one instruction cycle. However, modern processors feature Single Instruction, Multiple Data (SIMD) capabilities. By utilizing AVX-512, the CPU can theoretically process sixteen 32-bit floating-point numbers in a single clock cycle, achieving a massive theoretical 16x speedup.

But this introduces a fundamental hardware constraint: the **Von Neumann Bottleneck**.

The CPU core can compute numbers significantly faster than the system's RAM can supply them. To bridge this gap, hardware relies on extremely fast, physically close memory caches (L1, L2, and L3). As long as the data fits within these caches, the AVX-512 unit runs at maximum throughput. But the moment the dataset exceeds the L3 cache boundary, the CPU is forced to wait hundreds of clock cycles for data to arrive from main memory. The system shifts from being _compute-bound_ to _memory-bound_.


#### Implementation: The AVX-512 Kernel

To explicitly map where this transition happens, I implemented a custom benchmarking suite in C++ comparing a purely scalar approach against hardware-accelerated intrinsics.

##### 1. Memory Alignment

SIMD architectures demand strict memory alignment. To prevent pipeline stalling during memory fetches, the vector datasets were not allocated using standard pointers. Instead, memory was explicitly aligned to 64-byte boundaries (the exact width of an AVX-512 register) using cache-conscious allocation techniques.

##### 2. The Vectorized Loop

Bypassing the compiler's auto-vectorization, I utilized explicit Intel intrinsics to control the CPU at the hardware level. The core loop logic operates by:

-  Loading 16 floats simultaneously from the aligned memory of Vector A and Vector B into 512-bit registers (`_mm512_load_ps`).
-  Executing a parallel subtraction across all 16 lanes (`_mm512_sub_ps`).
-  Using Fused Multiply-Add (FMA) instructions to square the differences and accumulate the results in a single, highly efficient cycle (`_mm512_fmadd_ps`).


#### Performance Results: Hitting the Wall

To test the implementation, the array size (N) was systematically scaled from 1,024 elements up to 8,388,608 elements on an Intel Core i3-1005G1 (Ice Lake) processor.

Figure 1: Profiling data generated using Google Benchmark. Lower arrays fit cleanly into fast L1/L2 cache; larger arrays force slow RAM fetches.

Figure 2: Raw terminal output showing the timing execution degradation.

The data clearly illustrates the exact threshold of the hardware's limitations:

-  **The Cache Advantage:** When the array sizes fit comfortably within the CPU cache, the explicit AVX-512 instructions provide an 18x computational advantage over the scalar baseline.
-  **The Memory Wall:** Once the data footprint exceeds the L3 cache, that performance completely collapses. The advantage drops abruptly from 18x to just 2.1x due to RAM latency.


#### Conclusion

This benchmark isolates a critical reality of high-performance computing: optimizing mathematical instructions is only half the battle. If the memory architecture cannot feed the CPU fast enough, the most advanced SIMD instructions will sit idle.

For full implementation details, memory management strategies, and instructions on how to reproduce these metrics on your own local hardware, check out the complete source code on my GitHub repository.


