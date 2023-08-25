#{ include "/contents/01-bia.typ" }
#pagebreak()
#set heading(numbering: "1.")
#outline(
   indent: 1.5em,
)

#outline(title: "Danh mục hình ảnh", target: figure.where(kind: image))
// #outline(title: "Danh mục chương trình", target: figure.where(kind: raw))
#pagebreak()
#{ include "/contents/02-introduce.typ" }
#{ include "/contents/03-technologies/00.typ" }
#{ include "/contents/04-database/00.typ" }
#{ include "/contents/05-implementation/00.typ" }
#pagebreak()
#bibliography("/references.bib")
