import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NestedTreeControl, CdkTreeModule } from "@angular/cdk/tree";
import { HashTreeNode } from "../canister-http-request";
import { BehaviorSubject, Observable } from "rxjs";
import { ButtonComponent } from "../../ui";

function getNodeChildren(
  node: HashTreeNode | undefined | null
): HashTreeNode[] {
  if (!node) {
    return [];
  }

  switch (node.type) {
    case "fork":
      return [node.left, node.right];
    case "labeled":
      return [node.child];
    default:
      return [];
  }
}

@Component({
  selector: "app-hash-tree-node",
  standalone: true,
  imports: [CommonModule, CdkTreeModule, ButtonComponent],
  templateUrl: "./hash-tree-node.component.html",
  styleUrls: ["./hash-tree-node.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HashTreeNodeComponent {
  @Input()
  public set hashTreeNode(hashTreeNode: HashTreeNode | undefined | null) {
    if (!hashTreeNode) {
      return;
    }

    this.dataSourceSubject.next([hashTreeNode]);
  }

  public treeControl = new NestedTreeControl<HashTreeNode>(getNodeChildren);

  public dataSource$: Observable<HashTreeNode[]>;
  private dataSourceSubject: BehaviorSubject<HashTreeNode[]>;

  constructor() {
    this.dataSourceSubject = new BehaviorSubject<HashTreeNode[]>([]);
    this.dataSource$ = this.dataSourceSubject.asObservable();
  }

  public hasChild(_index: number, node: HashTreeNode): boolean {
    return getNodeChildren(node)?.length > 0;
  }

  public getNodeModifierClass(node: HashTreeNode): string | undefined {
    if (node.type === "labeled") {
      return "labeled-node";
    }

    if (node.type === "fork") {
      return "fork-node";
    }

    return;
  }

  public getToggleClass(node: HashTreeNode): string {
    return this.treeControl.isExpanded(node)
      ? "bi-chevron-down"
      : "bi-chevron-right";
  }

  public getToggleAllClass(node: HashTreeNode): string {
    return this.treeControl.isExpanded(node)
      ? "bi-arrows-collapse"
      : "bi-arrows-expand";
  }

  public toggleDescendants(node: HashTreeNode): void {
    this.treeControl.toggleDescendants(node);
  }
}
