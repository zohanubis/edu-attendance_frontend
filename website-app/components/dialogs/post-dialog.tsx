"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

interface PostDialogProps {
  type: "add" | "edit"
  post?: {
    id?: number
    title: string
    content: string
    author: string
  }
  onSubmit: (data: any) => void
  trigger?: React.ReactNode
}

export function PostDialog({ type, post, onSubmit, trigger }: PostDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: post?.title || "",
    content: post?.content || "",
    author: post?.author || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      id: post?.id,
      publishDate: new Date(),
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {type === "add" ? "Thêm bài viết" : "Chỉnh sửa"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{type === "add" ? "Thêm bài viết mới" : "Chỉnh sửa bài viết"}</DialogTitle>
          <DialogDescription>
            {type === "add" ? "Điền thông tin để tạo bài viết mới." : "Cập nhật thông tin bài viết."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề bài viết"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Tác giả</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Nhập tên tác giả"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Nhập nội dung bài viết"
                rows={8}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit">{type === "add" ? "Thêm bài viết" : "Lưu thay đổi"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
