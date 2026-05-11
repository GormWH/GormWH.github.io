---
title: "Bachelor's thesis — adjoint LBM for flow-field topology optimization"
description: "Replaced FEM with the Lattice Boltzmann Method inside a topology-optimization loop for a vanadium redox-flow battery flow field. Derived the adjoint LBM for velocity and concentration; the linear-scaling advantage did not appear at this mesh size. Defended at Osaka University, February 2019."
date: 2019-03-25
org: "Osaka-U"
tags: ["Research", "CFD", "LBM"]
important: false
---

- **Application:** vanadium redox-flow battery (VRFB) cell, 2D flow-channel design
- **Bet:** replace FEM with the Lattice Boltzmann Method (LBM) inside a density-method topology-optimization loop
- **Contribution:** derived the adjoint LBM for both velocity (f) and ion-concentration (g) distributions, then solved with MMA
- **Numerical setup:** half-symmetry domain 85·130 cells, Re = 10, parameter sweep α_max ∈ {10, 20, 50}, k_max ∈ {1, 2, 5}
- **Advisors:** Profs. Kikuo Fujita, Shintaro Yamasaki, Masashi Nomaguchi, and Asst. Prof. Kentaro Yaji · Defended February 2019

Performance of a vanadium redox-flow battery is set by the electrolyte flow near the electrode, and the design space — where channels go, how thick the electrode is, where it interlocks with flow — is too high-dimensional to design by hand. Yaji et al. (2017) showed that topology optimization solves the geometry, but they did it with the finite element method, and FEM scales poorly toward the 3D and electrode-microstructure problems that are the real targets. The thesis asks one question: does the Lattice Boltzmann Method, which is explicit and naturally parallel, slot into the same topology-optimization loop and let the scale-up go further?

## Why LBM

LBM discretizes the Boltzmann equation on a regular lattice and evolves particle distribution functions instead of solving Navier-Stokes directly. The reasons it is interesting for this problem are concrete. It is explicit, so the cost per step is O(N) and parallelizes cleanly across the lattice. It handles complex geometry without remeshing — the design variable lives on the same grid that the flow does. And the porous-medium term that the density method needs (Brinkmann: −α(γ) u added to the momentum equation) maps cleanly onto LBM by attaching a force term to the streaming step after collision. I used the standard D2Q9 BGK model for the velocity field and a parallel BGK update for a separate ion-concentration distribution g_i, with a reaction source S = k_m(u) A_v (c_max − c) tying the two together. The pressure-drop constraint that the optimization needs went in as an augmented-Lagrangian penalty, following Yaji's prior LBM-topology-opt work for thermal flows.

The real work of the thesis was the adjoint LBM. The objective and the constraint depend on the design variable γ through the flow and concentration fields, and computing those sensitivities directly is hopeless at this scale. I derived the adjoint update for both f and g — same lattice, same BGK structure, time stepping in reverse — and verified that the resulting sensitivities fed MMA cleanly through 800 update steps.

## What the runs showed

Three things came out, and one of them was not the result I wanted.

First, the parameter sweep was clean. Larger α_max (the porous resistance ceiling) pulled solutions toward merged channels, because the optimizer needed somewhere for the pressure-drop budget to go. Larger k_max (the reaction-rate coefficient) produced finer channel structure and shifted the reaction toward the inlet, with the inlet-side electrode wall thickening to balance the pressure-drop constraint. Both directions matched the physics.

Second, the geometries did not match Yaji's FEM reference. Yaji's optimized cells were comb-tooth interdigitated channels with wall-like electrodes; mine had connected channels and channels embedded inside thicker electrodes. Two things drive this: I used velocity-inlet plus pressure-outlet because standard incompressible LBM cannot impose pressure on both boundaries, while the FEM reference used pressure-pressure; and the FEM reference solved with SLP while I used MMA. Different boundary conditions and different optimizers explain the divergence without anyone being wrong — but they also mean the comparison is not apples-to-apples.

Third, and this is the result I have to be honest about: the expected linear-scaling advantage did not materialize at this mesh size. At 11,050 cells the LBM solve finished in 24-34 minutes for a 200-step optimization run, against ~120 minutes for the FEM reference on the same mesh. That looks like a win. But when I refined the mesh 4× and plotted cost against element count, the LBM slope was not visibly shallower than the FEM slope. The total cost stayed lower, but the asymptotic advantage I had argued for in the proposal was not visible at this scale. Read honestly, the result is not a refutation of LBM-in-topology-opt — the predicted regime starts further out than I reached — but it is also not the confirmation the thesis was set up to find.

## What I'd change today

The thesis's own §5.2 names three limits and they are still the right three. First, the scaling claim needs a real mesh — orders of magnitude more cells, not 4×, before the linear regime should be expected to show. Today I would set up the experiment to span at least two decades of N before drawing a slope. Second, the boundary-condition mismatch with the FEM reference is fixable with a compressible LBM formulation (Feng et al., 2009), which would allow pressure on both inlet and outlet and produce a comparison where the only varying factor is the solver, not the boundary geometry. Third, and most importantly, the 2D problem was chosen for parity with the reference, but the actual motivation for switching to LBM was always 3D plus electrode-microstructure design. The right next experiment is a 3D run where the FEM cost curve has already started to bite.

The other thing I would change is framing. The contribution worth defending is the adjoint LBM derivation for coupled velocity-and-concentration fields, not the wall-clock number against a single FEM reference. The derivation is reusable; the timing comparison was always going to be sensitive to mesh, BC, and optimizer choices.
